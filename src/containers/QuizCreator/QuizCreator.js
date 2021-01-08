import React, { useState } from 'react';
import './QuizCreator.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import {
  createControl,
  validate,
  validateForm,
} from '../../form/formFramework';
import Auxiliary from '../../hoc/Auxiliary';
import { connect } from 'react-redux';
import {
  quizCreateQuestion,
  quizFinishCreate,
} from '../../store/actions/create';

function createOptionControl(number) {
  return createControl(
    {
      label: 'Вариант ' + number,
      errorMessage: 'Значение не может быть пустым',
      id: number,
    },
    { required: true }
  );
}

function createFormControl() {
  const output = {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };

  return output;
}

function QuizCreator(props) {
  const [formControls, setFormControls] = useState(createFormControl());
  const [rightAnswerId, setRightAnswerId] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const addQuestionHandler = (event) => {
    event.preventDefault();

    const quizItem = {
      question: formControls.question.value,
      id: props.quiz.length + 1,
      rightAnswerId: rightAnswerId,
      answer: [
        {
          text: formControls.option1.value,
          id: formControls.option1.id,
        },
        {
          text: formControls.option2.value,
          id: formControls.option2.id,
        },
        {
          text: formControls.option3.value,
          id: formControls.option3.id,
        },
        {
          text: formControls.option4.value,
          id: formControls.option4.id,
        },
      ],
    };

    props.quizCreateQuestion(quizItem);

    setIsFormValid(false);
    setRightAnswerId(1);
    setFormControls(createFormControl());
  };

  const createQuizHandler = (event) => {
    event.preventDefault();

    setIsFormValid(false);
    setRightAnswerId(1);
    setFormControls(createFormControl());

    props.quizFinishCreate();
  };

  const onChangeHandler = (value, controlName) => {
    const fC = { ...formControls };
    const control = { ...fC[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    fC[controlName] = control;

    setIsFormValid(validateForm(fC));
    setFormControls({ ...fC });
  };

  const selectChangeHandler = (event) => {
    setRightAnswerId(+event.target.value);
  };

  const renderControls = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];

      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              onChangeHandler(event.target.value, controlName)
            }
          ></Input>
          {index === 0 ? <hr /> : null}
        </Auxiliary>
      );
    });
  };

  const select = (
    <Select
      label="Выберите правильный ответ"
      value={rightAnswerId}
      onChange={selectChangeHandler}
      options={[
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
      ]}
    ></Select>
  );

  return (
    <div className="QuizCreator">
      <div>
        <h1>Создание теста</h1>

        <form onSubmit={submitHandler}>
          {renderControls()}

          {select}

          <Button
            type="primary"
            onClick={addQuestionHandler}
            disabled={!isFormValid}
          >
            Добавить вопрос
          </Button>

          <Button
            type="success"
            onClick={createQuizHandler}
            disabled={props.quiz.length === 0}
          >
            Создать тест
          </Button>
        </form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    quizCreateQuestion: (item) => dispatch(quizCreateQuestion(item)),
    quizFinishCreate: () => dispatch(quizFinishCreate()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
