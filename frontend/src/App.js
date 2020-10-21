import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Request from './services/Request';
import Loader from 'react-loader-spinner';

class App extends Component {
  constructor(props) {
    super(props);
    this.changeFile = this.changeFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.request = new Request();
  }

  state = {
    file: '',
    targetFile: '',
    message: '',
    showImage: false,
    reader: '',
  };

  changeFile = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.setState({ file: event.target.value, targetFile: event.target.files[0], reader: reader, message: '' });
    this.setState({ dados: [] });
    this.setState({ comparacoes: 0 });
    this.setState({ button: false });
    this.setState({ buttonUpload: true });
    this.setState({ pesquisa: '' });
  };

  submit = () => {
    this.request
      .uploadFile(this.state.targetFile)
      .then((response) => {
        this.setState({ button: true });
        this.setState({ buttonUpload: false });

        // this.reponseJson(response.json())
      })
      .catch((error) => {
        this.setState({ button: false });
        this.setState({ buttonUpload: true });

        // this.reponseJson(error.json())
      });
  };

  handleChange(event) {
    this.setState({ pesquisa: event.target.value });
  }

  buscaBinaria = () => {
    this.setState({ loader: true });
    this.setState({ dados: [] });

    this.request
      .buscaBinaria(this.state.pesquisa)
      .then((response) => {
        this.reponseJson(response.json());
      })
      .catch((error) => {
        this.reponseJson(error);
      });
  };

  buscaSequencial = () => {
    this.setState({ loader: true });
    this.setState({ dados: [] });

    this.request
      .buscaSequencial(this.state.pesquisa)
      .then((response) => {
        this.reponseJson(response.json());
      })
      .catch((error) => {
        this.reponseJson(error);
      });
  };

  reponseJson = (response) => {
    response.then((result) => {
      this.setState({ message: result.message });
      if (result.error) {
        this.setState({ dados: [] });
        this.setState({ comparacoes: 0 });
      } else {
        this.setState({ dados: result.dados.dadosPessoa });
        this.setState({ comparacoes: result.dados.comparacoes });
      }
      this.setState({ loader: false });
    });
  };


  buttonUploadShow = () => {
    return (
      <div>
        <button type="submit" onClick={this.submit}>
          Enviar arquivo
        </button>
      </div>
    );
  };

  loaderShow = () => {
    if (this.state.loader) {
      return (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      );
    } else {
      return null;
    }
  };

  buttonShow = () => {
    if (this.state.file.indexOf('.csv') > -1 && this.state.button && this.state.pesquisa) {
      return (
        <div className="space-around mb-50">
          <button onClick={this.buscaSequencial}>Busca Sequencial</button>
          <button onClick={this.buscaBinaria}>Busca Binária</button>
        </div>
      );
    } else {
      return null;
    }
  };

  pesquisaShow = () => {
    if (this.state.file.indexOf('.csv') > -1 && !this.state.buttonUpload) {
      return (
        <label>
          Pesquisar:
          <input type="text" value={this.state.pesquisa} onChange={this.handleChange} 
          placeholder="Nome da pessoa..."  className="ml-10 mb-20"/>
        </label>
      );
    } else {
      return null;
    }
  };
  tableShow = () => {
    if (this.state.dados.length > 0) {
      return (
        <div>
          <div className="space-around">
            <p>Comparações: {this.state.comparacoes}</p>
          </div>
          <table id="customers">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Email</th>
                <th>Sexo</th>
                <th>Cpf</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {this.state.dados.map((num, j) => (
                  <td key={j}>{num}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Bem vindo!</h2>
        </div>
        <p className="App-intro">
          <input type="file" name="file" value={this.state.file} onChange={this.changeFile} />
        </p>
        {this.pesquisaShow()}
        {this.state.buttonUpload && this.buttonUploadShow()}
        <h1>{this.state.message}</h1>
        {this.state.loader && this.loaderShow()}
        {this.state.file && this.buttonShow()}
        {this.state.dados && this.tableShow()}
      </div>
    );
  }
}

export default App;
