
import './input-in-form.scss'

export const Input = ({ label, register, type = 'text', placeholder }) => (
  <>
  
    <input
      {...register(label, {
        required: true,
      })}
      className='form-input'
      placeholder={placeholder}
      type={type}
    />
    {type === 'password'}
  </>
);