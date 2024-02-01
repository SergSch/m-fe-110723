import React, { useEffect, useState } from 'react';

import classes from './DwarfForm.module.css';

import { useForm } from 'react-hook-form';

export default function DwarfForm({ handleAddUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [stateError, setStateError] = useState(false);

  const [formError, setFormError] = useState('');

  const dwarfSubmitHandler = async (formData) => {
    if (formData.dwarfName === 'Dwalin' && formData.dwarfWeapon === 'Sword') {
      setStateError(true);
    } else {
      console.log(formData);
      handleAddUser(formData);
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
          {
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            method: 'POST',
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) throw new Error('Somthing went wrong');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const dwarfErrorHandler = (formErrors) => {
    console.log(formErrors);
    //console.error('Fix All Errors!')
  };

  const checkDwarfData = () => {
    const { dwarfName, dwarfWeapon, dwarfEmail } = getValues();
    if (!dwarfEmail || !dwarfName || dwarfWeapon.toLowerCase() === 'crossbow') {
      setFormError('Some error');
    } else {
      setFormError('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(dwarfSubmitHandler, dwarfErrorHandler)}
      className={classes.dwarfForm}
    >
      <label htmlFor="dwarfName">Enter your name, brave dwarf!</label>
      <input
        className={classes.dwarfFormInput}
        type="text"
        {...register('dwarfName', {
          required: 'Please, enter your name!',
          minLength: {
            value: 3,
            message: 'Too short',
          },
          maxLength: {
            value: 12,
            message: 'Too long',
          },
        })}
      />
      {errors.dwarfName && errors.dwarfName.message && (
        <p>{errors.dwarfName.message}</p>
      )}
      <label htmlFor="weapon">What weapon do you prefer?</label>
      <input
        className={classes.dwarfFormInput}
        type="text"
        {...register('dwarfWeapon', {
          required: 'Choose your weapon!',
          validate: (value) =>
            value.toLowerCase() !== 'crossbow' ||
            'You have to put another weapon',
        })}
      />
      {errors.dwarfWeapon && errors.dwarfWeapon.message && (
        <p>{errors.dwarfWeapon.message}</p>
      )}
      <label htmlFor="email">Email</label>
      <input
        className={classes.dwarfFormInput}
        type="email"
        {...register('dwarfEmail', {
          required: 'Choose your email!',
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: 'Enter correct email',
          },
        })}
      />
      {errors.dwarfEmail && errors.dwarfEmail.message && (
        <p>{errors.dwarfEmail.message}</p>
      )}
      {formError && <p>{formError}</p>}
      {stateError && <p>You already have 2 axes!</p>}

      <button onClick={checkDwarfData}>Check Form</button>
      <button className={classes.dwarfFormButton}>Join Torin's troop!</button>
    </form>
  );
}

// const checkForm = () => {
//   const formInputs = getValues();
//   let errorMessage = '';
//   for (let [key, value] of Object.entries(formInputs)) {
//     if (!value) {
//       errorMessage += `Field ${key} is empty!`;
//     }
//   }
//   setFormError(errorMessage);
// }

// 6. Гномы иногда плохо знают грамоту, поэтому давайте дадим им возможность проверить форму перед отправкой. Нужно добавить кнопку "Check Form", и при нажатии на нее, НЕ запуская валидацию, проверить, что у нас заполнены все поля, и что в оружии не указан `crossbow`. То есть, мы выполняем какую-то логику НЕ при нажатии на сабмит.

// 5. Сейчас все наши поля валидируются независимо друг от друга. Иногда бывает так, когда нам нужно проверить значение одного поля в зависимости от другого. Нужно сделать так, чтобы нельзя было одновременно ввести имя `Dvalin` и оружие `Sword`. Тут нам нужно работать уже в функции-обработчике события сабмита, и работать с данными инпутов. В таком случае, нам нужно выводить сообщение `You already have 2 axes!` над кнопкой отправки формы.

// 4. Добавляем свою функцию валидации. Сделаем так, чтобы в поле `weapon` нельзя было бы ввести значение `crossbow` (в любом регистре). В этом нам поможет свойство `validate`, которое мы можем указать при регистрации инпута. Сообщение об ошибке - `We need only strong dwarwes, no shooters!`.

// 3. Добавляем валидацию емейла. Рекомендуется это делать через регулярные выражения. Шаблон емейла (максимально упрощенный):
// ```
// /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
// ```

// 2. Добавляем еще один инпут, емейл. Он тоже должен быть обязательным. Сообщение о незаполненном емейле: "All our eagles are busy now, please, put your email!"

// 1. Добавляем ограничение длины имени. Минимальная длина - 3, максимальная - 12 символов.
