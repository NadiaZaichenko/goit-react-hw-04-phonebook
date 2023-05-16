import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    StyledLabel,
    StyledForm,
    StyledInput,
    StyledButton,
  } from './ContactForm.styled';
import { useEffect } from 'react';

const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const numberRegex = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = yup.object().shape({
    name: yup
    .string()
    .max(20)
    .matches(nameRegex, {
        message: "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    })
    .required('Name is required'),
    number: yup
    .string()
    .min(3)
    .matches(numberRegex, {
        message: "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
    })
    .required('Number is reqired')
})

export const ContactForm = ({onSubmit}) => {

    const {
      register, 
      handleSubmit,
      formState: {errors},
      reset,
      formState,
    } = useForm({
      defaultValues: {
        name: '',
        number: ''
      },
      resolver: yupResolver(schema),
      mode: 'onTouched',
    })
   useEffect(() => {
    if(formState.isSubmitSuccessful) {
      reset();
    }
   }, [formState.isSubmitSuccessful, reset]);

    return (
       <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledLabel>
          Name
          <StyledInput
            type="text"
            placeholder="Enter a contact name"
            autoComplete="off"
            {...register('name')}
          />
          {errors.name && <div>{errors.name?.message}</div>}
        </StyledLabel>
        <StyledLabel>
          Number
          <StyledInput
            type="tel"
            placeholder="Enter a contact number"
            autoComplete="off"
            {...register('number')}
          />
          {errors.number && <div>{errors.number?.message}</div>}
        </StyledLabel>
        <StyledButton type="submit">Add contact</StyledButton>
      </StyledForm>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
