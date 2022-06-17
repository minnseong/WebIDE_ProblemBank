import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import { ControlledEditor } from "@monaco-editor/react";
import SampleCode from '../../../../constansts/SampleCode';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string'
import { getProblemData } from '../../../../_actions/problemAction';
import projectsAPI from '../../../../apis/projects';
import problemsBank from '../../../../apis/problemsBank';
import WrapperLoading from '../../../../components/WrapperLoading';
import Loading from '../../../../components/Loading/Loading';
import DDetailProblemLayout from '../../../../layouts/DDetailProblemLayout';
var moment = require('moment');
var wrongList = [];
var correct = 0;

function DDetailProblem(props) {
    const [problems, setProblems] = useState([])
    const [problem, setProblem] = useState({})
    const {problemsAllData} = useSelector(state => state.problem);

    const [language, setLanguage] = useState("c")
    const [contentEditor, setContentEditor] = useState(SampleCode["c"])
    const [submit, setSubmit] = useState(false)
    const [theme, setTheme] = useState("white")
    
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(true)
    
    const { id } = queryString.parse(props.location.search);

    useEffect(() => {
        if(problemsAllData){
            const { data }  = problemsAllData;
            const [ problem ] = data.filter(element =>Number(element.id) === Number(id))
            setProblems(data)
            setLoading(false)
            setProblem(problem)
        }else{
            dispatch(getProblemData()).then(response => {
                const { data } = response.payload
                const [ problem ] = data.filter(element =>Number(element.id) === Number(id))
                
                console.log(problem)
                setProblem(problem)
                setProblems(data)
                setLoading(false)
            })
        }
    }, [id])

    const handleEditorChange = (env, value) => {
        setContentEditor(value)
    }
    
    const handleProblemToList = async (id) => {
        try {
            const params = {
                problemId : id
            }
            const response = await problemsBank.ProblemToMyList(params);
            let problemTemp = {...problem, like : !problem.like};
            setProblem(problemTemp)
        } catch (error) {
            alert("서버 연결 실패합니다. 다시 시도해주세요.")
            console.log(error);
        }
    }
    const handleCopyURL = () => {
        var dummy = document.createElement('input'),
        text = window.location.href;

        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert("링크를 복사 되었습니다")
    }

    const nextQuestion = async() => {
        if (window.confirm("해당 문제를 제출하겠습니다? 다시 돌아올 수 없으니 신중하게 생각해보세요.")) {       
            
            setSubmit(true);
                        
            const problemId = problem.id;
    
            const params = {
                sourceCode: contentEditor,
                language,
                problemId: Number(problemId)
            }
    
            const response = await projectsAPI.compile(params); 
            
            const { data } = response;
            wrongList.push(problemId)
            correct += data.correctCount

            setSubmit(false);
            setContentEditor(SampleCode["c"])
        } else {
        }       
    }

    const Finish = async () => {
        try {
            setSubmit(true);
                        
            const problemId = problem.id;
    
            const params = {
                sourceCode: contentEditor,
                language,
                problemId: Number(problemId)
            }
    
            const response = await projectsAPI.compile(params); 
            
            const { data } = response;

            wrongList.push(problemId);
            
            var timeOutSubmit = function(){
                alert(`제출 완료되었습니다.`);
                setSubmit(false);
            };
            setTimeout(timeOutSubmit, 1000);
           
            var pageRedirect = function(){
                props.history.push('/coding-test/result?wrong='+ wrongList); 
                wrongList = [];
            };
            
            setTimeout(pageRedirect, 1000);
            

        } catch (error) {
            setSubmit(false);
            alert("서버오류입니다. 잠시 후 다시 시도해주세요.");
            console.log(error)
        }

    }


    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(20);

    useEffect(() => {
        const countdown = setInterval(() => {
        if (parseInt(seconds) > 0) {
            setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
            if (parseInt(minutes) === 0) {
                Finish();
                
                clearInterval(countdown);
            } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
            }
        }
        }, 1000);
        return () => clearInterval(countdown);
    }, [minutes, seconds])
    let [problmeCnt, setProblemCnt] = useState(1);

    const goNextProblem = () => {
        problmeCnt++
        setProblemCnt(problmeCnt)
    }
    const goBackProblem = () => {
        problmeCnt--
        setProblemCnt(problmeCnt)
    }


    if(loading){
        return <Loading  type={'bars'} color={'black'}  />
    }
    return (
        <DDetailProblemLayout>
            <div className="problem__detail">
                <div className="problem__detail--content">
                    <div className="tab__header">
                        <ul className="tab__header--content">
                            <li style={{background: 'white'}} onClick={() => alert("현재 개발중인 기능 입니다...")}>설명</li>
                            {/* <li onClick={() => alert("현재 개발중인 기능 입니다...")}>답안</li>
                            <span>|</span> */}
                            <li onClick={() => alert("현재 개발중인 기능 입니다...")}>토론</li>
                            {/* <span>|</span>
                            <li onClick={() => alert("현재 개발중인 기능 입니다...")}>Submit</li> */}
                        </ul>
                    </div>
                    <div className="wrapper__content">
                        <h3>문제 {problmeCnt} : {problem.name} (난이도 - {problem.level})</h3>
                        <ul className="tab__header--task">
                            <li style={{cursor: 'pointer'}} onClick={() => handleProblemToList(problem.id)}><i className="fa fa-list-alt"></i> { problem.like ? "Remove list" : "Add to list"}</li> 
                            <li style={{cursor: 'pointer'}} onClick={() => handleCopyURL()}><i className="fa fa-share-square-o"></i> Share</li>
                            <li>Created: {moment(problem.created).format("YYYY-MM-DD")}</li>
                            <li>Language: {problem.language}</li>
                        </ul>
                        <div className="problem__infor">
                            <div className="problem__infor--desc">
                                <p>문재 정의</p>
                                <span>{problem.content}</span>
                            </div>
                            <div className="problem__infor--input">
                                <p>입력</p>
                                <span>{problem.input}</span>
                            </div>
                            <div className="problem__infor--output">
                                <p>츨력</p>
                                <span>{problem.output}</span>
                            </div>
                            <div className="problem__infor--example">
                                <div className="problem__infor--inputexp">
                                    <p>입력 예제</p>
                                    {
                                        problem.testcases.length !== 0 &&
                                            problem.testcases.map(testcase => <span>{testcase.input_exp}</span>)
                                        
                                    }
                                </div>
                                <div className="problem__infor--outputexp">
                                    <p>출력 예제</p>
                                    {
                                        problem.testcases.length !== 0 &&
                                            problem.testcases.map(testcase => <span>{testcase.output_exp}</span>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="problem__detail--vseditor">
                    <div className="tab__header--editor">
                        <ul>
                            <li>
                                <span>언어 </span>
                                <select name="" id="" className="language" value = {language} onChange={e => { setLanguage(e.target.value); setContentEditor(SampleCode[e.target.value])}}>
                                    <option value="c">C</option>
                                    <option value="cpp">C++</option>
                                    <option value="java">Java</option>
                                    <option value="python">Python</option>
                                    <option value="r">R</option>
                                </select>
                            </li>
                            <p>남은시간 : {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                       
                    
                            <li>
                                <span>Editor Theme </span>
                                <select name="" id="" className="language" value={theme} onChange={(e) => setTheme(e.target.value)}>
                                    <option value="white">White</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                    <div className="wrapper__editor">
                            {
                                submit ? 
                                <div className="wrapper__editor--submit">
                                    <WrapperLoading />
                                </div> : ""
                            }
                            <ControlledEditor
                                width="100%"
                                height="100%"
                                theme={theme}
                                language={language}
                                value={contentEditor}
                                onChange={handleEditorChange}
                                loading={<WrapperLoading />}
                            /> 
                        <div className="tab__footer" style={{ float : 'right'}}>
                            <button onClick={() => {props.history.push(`/coding-test/level1?id=${problem.id - 1}`); goBackProblem()}} disabled={true} >Prev</button>&nbsp;
                                    <span>{problmeCnt}/{4}</span>&nbsp;
                            <button style={{marginRight : '10px'}}onClick={() => {props.history.push(`/coding-test/level1?id=${problem.id + 1}`); nextQuestion(); goNextProblem()}} disabled={problmeCnt === 4}>Next</button>
                            <button onClick={() => {Finish()}}>종료</button>
                        </div>
                    </div>

                </div>
            </div>
        </DDetailProblemLayout>
    )
}


export default DDetailProblem

