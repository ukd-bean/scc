import './App.css';
import { connect } from 'react-redux';
import { Header } from "./container/Header";
import { Main } from "./container/Main";

function App({ data }) {

  return (
    <div className="scc-frame">
      <Header />
      <Main />
    </div>
  );
}

const mapStateToProps = state => ({
  data: state
})

export default connect(mapStateToProps)(App);
