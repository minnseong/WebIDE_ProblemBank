import React, { useState } from 'react'
import userAPI from '../../apis/userAPI';
import { auth } from '../../_actions/userAction';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'querystring'


//fist get id && password from url => auth => save token in localstore
//send check exist token in localstore 
//if exist token in localstore => OK
//else if don't exist token => authen fail
export default function (ComposedClass, load = false, adminRoute = null) {
    function Authentication(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();
        React.useEffect(() => {
            const query = qs.parse(window.location.search.slice(1));
            /*
            * @load: 인증한 컨테이너 결정한 값
            * @id: 받은 유저 id
            * @token: 유저별로 암호화된 tokenㄴ
            */

            if (load) {
                // 없을때 저장된거 있는 token있는지 체크하면서 권한을 결정
                if (!query.user_id && !query.token) {    
                    let problem_token = localStorage.getItem("problem_bank") ? localStorage.getItem("problem_bank") : "";       
                    if(problem_token)
                    {
                        dispatch(auth()).then(response => {
                            if (!response.payload.isAuth) {
                                props.history.push('/warning')
                            }
                        }).catch(error => {
                            props.history.push('/warning')
                            localStorage.removeItem("project_manager");
                            localStorage.removeItem("redirect_token")
                        })
                    }else{
                        localStorage.removeItem("problem_bank");
                        localStorage.removeItem("redirect_token");
                        props.history.push('/warning')
                    }

                // 처음에 전달할때 Url부터 받아서 체크함
                // step1: id 및 token 전달해서 체크함
                // step2: 인증을 성곡했으면 token를 받아서 local store에서 저장함
                } else {
                    try {
                        const params = {
                            userId: query.user_id,
                            authToken: query.token
                        }
                        const allAPI = async () => {
                            try {
                                const response = await userAPI.authRedirect(params);
                                const { result} = response;
                                if (result) {
                                    const { jwt } = response;
                                    localStorage.setItem("problem_bank", jwt);
                                    localStorage.setItem("redirect_token", query.token)
                                    dispatch(auth()).then(response => {
                                        props.history.push('/')
                                        if (!response.payload.isAuth) {
                                            props.history.push('/warning')
                                        } 
                                    })
                                } else {
                                    props.history.push('/warning')
                                }
                                
                            } catch (error) {
                                console.log(error)
                                props.history.push('/warning')
                                localStorage.removeItem("project_manager");
                                localStorage.removeItem("redirect_token")
                            }
                        }
                        allAPI();
                    } catch (error) {
                        console.log(error)
                        props.history.push('/warning')
                        localStorage.removeItem("project_manager");
                        localStorage.removeItem("redirect_token")
                    }
                }
            }
                    
        }, [dispatch])
        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return Authentication;
}
