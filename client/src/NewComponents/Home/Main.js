import React, { Component } from 'react';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';
import '../../styles/forms.css';

export default class Main extends Component {

  render () {
		const {
			auth,
			handleSetForm,
			form,
			handleInputChange,
			handleLogin,
			handleRegister,
			email,
			password,
			username
		} = this.props;
		
    return (
      <div className="home">
     	 <div>
        <div className="top-content">
        	<div className="container">
						<div className="row">
							<div className="col-sm-9 col-sm-offset-1 text">
								<h1>Collaboration and Coding has never been so easy!</h1>
								<div className="description">
									<p>
									Our goal is to create an enviroment where coders can easily pair program and challenge themselves within a community.
									</p>
								</div>
							</div>
						</div>    
						<div className="row">
							<div className="col-sm-10 col-sm-offset-1 show-forms">
								<span className="show-register-form" onClick={() => handleSetForm('register')}>Register</span> 
								<span className="show-forms-divider"> / </span> 
								<span className="show-login-form" onClick={() => handleSetForm('login')}>Login</span>
							</div>
						</div>
						{ form === 'register' &&  <Register
																				email={email}
																				password={password}
																				username={username}
																				handleInputChange={handleInputChange}
																				handleRegister={handleRegister}
																			/> 
						}
						{ form === 'login' &&  <Login
																			email={email}
																			password={password}
																			handleInputChange={handleInputChange}
																			handleLogin={handleLogin}
																	 /> 
						}
					</div>
				</div>
			</div>
			<Footer />
		</div>
    )
  }
}