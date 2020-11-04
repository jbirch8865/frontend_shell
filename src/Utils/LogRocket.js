import setupLogRocketReact from 'logrocket-react';
import LogRocket from 'logrocket';

export default function BuildLogRocket()
{
  LogRocket.init(process.env.REACT_APP_LOG_ROCKET,{
    network: {
      requestSanitizer: request => {
        request.headers['Authorization'] = null;
        try
        {
          let json_request = JSON.parse(request.body)
          if('password' in json_request)
          {
            json_request.password = null
            request.body = JSON.stringify(json_request)
          }
        }catch(e){}
        return request;
      },
      responseSanitizer: response => {
        try
        {
          let json_response = JSON.parse(response.body)
          if('payload' in json_response && 'hash' in json_response.payload.data)
          {
            json_response.payload.data.hash = null
            response.body = JSON.stringify(json_response)
          }
        }catch (e){}
        return response;
      },
    }})
    setupLogRocketReact(LogRocket)
    
}
