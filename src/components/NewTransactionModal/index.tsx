import Modal from 'react-modal';
import { Container, RadioBox, TransactionTypeContainer } from './styles';

import closeImg from '../../assets/close.svg';
import incomeImage from '../../assets/income.svg';
import outcomeImage from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';
import { api } from '../../services/api';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement('#root');

function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');

  function handleCreateNewTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      title,
      value,
      category,
      type,
    };

    api.post('/transactions', data);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={event => setValue(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === 'deposit'}
            activeColor="green"
            onClick={() => {
              setType('deposit');
            }}
          >
            <img src={incomeImage} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === 'withdraw'}
            activeColor="red"
            onClick={() => {
              setType('withdraw');
            }}
          >
            <img src={outcomeImage} alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          value={category}
          placeholder="Categoria"
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}

export { NewTransactionModal };
