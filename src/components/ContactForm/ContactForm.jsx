import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from 'components/ContactForm/ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit({ id: nanoid(), name, number });
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    return (
      <div>
        <form className={css.containers} onSubmit={this.handleSubmit}>
          <div className={css['phon-container']}>
            <label htmlFor="exampleInputName" className={css['form-label']}>
              Name
            </label>
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              onChange={this.handleChange}
              value={name}
              placeholder="Jacob Mercer"
              required
            />
          </div>

          <div className={css['phon-container']}>
            <label htmlFor="exampleInputNumber" className={css['form-label']}>
              Number
            </label>
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              onChange={this.handleChange}
              value={number}
              placeholder="999-99-99"
              required
            />
          </div>

          <button type="submit" className={css.btn}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
