import React, { useState } from 'react';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader/Loader';


function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [loginError, setLoginError] = useState(false); // Track login error
  const [error, setError] = useState('');
  const [loader, setLoader]=useState(false)
  const navigate= useNavigate()

  const handleLogin = async (e) => {
    setLoader(true)
    e.preventDefault();

    // SOAP payload
    const payload = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
        xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <login xmlns="http://tempuri.org/">
                    <user_id>${userId}</user_id>
                    <passwd>${password}</passwd>
                    <auth_code>${authCode}</auth_code>
                </login>
            </soap:Body>
        </soap:Envelope>`;

    const headers = {
      'Content-Type': 'text/xml',
    };
    try {
      const response = await axios.post(
        'http://182.180.121.186:4000/retailService.asmx',
        payload,
        { headers }
      );

      if (response.status === 200) {
        const parser = new XMLParser();
        const parsedData = parser.parse(response.data);

        const loginResult = parsedData['soap:Envelope']?.['soap:Body']?.['loginResponse']?.['loginResult'];

        if (loginResult) {
          const servId = JSON.parse(loginResult)[0].serv_id;

          // If servId is valid, proceed, else set error state
          if (servId) {
            // Successfully retrieved servId, proceed to next steps
            localStorage.setItem('serv_id', servId)
            setLoginError(false);
            navigate('/dashboard')
          } else {
            // Handle missing servId
            setLoginError(true);
            setError('Failed to retrieve valid servId');
          }
        } else {
          setLoginError(true);
          setError('Unexpected response structure.');
        }
      } else {
        setLoginError(true);
        setError('Error occurred while making the request');
      }
    } catch (err) {
      setLoginError(true);
      setError('Server error');
      console.error(err);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light p-4">
      <div className="w-100" style={{ maxWidth: "320px"}}>
        <div className="card shadow-lg border-0" style={{ borderRadius: '10px' }}>
          <div className="card-body text-center"
          style={{
            height: '300px'
          }}
          >
            <h3 className="card-title text-uppercase fw-bold mb-4">Login</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="User name"
                  aria-label="User name"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  style={{
                    borderRadius: '10px',
                    padding: '0 20px'
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control form-control-sm"
                  placeholder="Password"
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    borderRadius: '10px',
                    padding: '0 20px'
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Auth"
                  aria-label="Authentication Code"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  required
                  style={{
                    borderRadius: '10px',
                    padding: '0 20px'
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-success btn-sm"
                style={{
                  borderRadius: '10px',
                  width: '85px',
                }}
              >
                Submit
              </button>
            </form>

            {loader?  (
              <Loader/>
            ):
            (loginError && (
              <div className='d-flex justify-content-center'>
                <div
                  style={{
                    marginTop: '10px',
                    padding: '10px',
                    backgroundColor: '#ff4200',
                    borderRadius: '10px',
                    width: '200px'
                  }}
                >
                  <small>{error}</small> {/* Display dynamic error message */}
                </div>
              </div>
            ))
            }
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
