import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './QuizList.scss';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';

function QuizList(props) {
  // const [quizes, setQuizes] = useState([]);
  // const [loading, setLoading] = useState(true);

  const renderQuizes = () => {
    return props.quizes.map((quiz) => (
      <li key={quiz.id}>
        <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
      </li>
    ));
  };

  useEffect(() => {
    props.fetchQuizes();
  }, []);

  return (
    <div className="QuizList">
      <div>
        <h1>Список тестов</h1>
        {props.loading && props.quizes.length !== 0 ? (
          <Loader />
        ) : (
          <ul>{renderQuizes()}</ul>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
