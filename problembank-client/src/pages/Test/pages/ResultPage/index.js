import './style.scss'
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import problemsBank from '../../../../apis/problemsBank';
import Tutorial from '../../components/Tutorial';
import Loading from 'react-loading';
import Images from '../../../../constansts/Images';
import { Card, Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState, Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import queryString from 'query-string';

function ResultPage(props) {
    let qs = queryString.parse(window.location.search)

    let wrongList = qs['wrong'].split(',')
    
    return (
        <div style={{textAlign :'center', overflow:'hidden'}}>

            <div style={{margin:'60px'}}>
            <h1>총 4개의 문제 중 <span style={{color:'red'}}>{wrongList.length} 개</span> 틀리셨습니다.</h1>
            <h3>아래는 틀린 문제를 다시 풀어보세요.</h3>
            </div>
            <div style={{texAlign:'center'}}>
            {
                wrongList.map((id, index) => {
                   return (
                    <div>
                    <Card onClick={() => props.history.push(`/problem/view?id=${id}`)} style={{ width: '20rem' ,float: 'left', marginTop : '4%' ,marginLeft: '5%'}}>
                    <Card.Body>
                    <Card.Img  style={{width:'100px', height:'100px', border :'50px'}}variant="top" src={Images.codetest} />
                        <Card.Title>
                            틀린문제 {index+1}
                        </Card.Title>
                        <Card.Text>
                            클릭하여 다시한번 풀어보세요.
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </div>
                   ) 
                })
            }
            </div>
        </div>
        )
    }

export default ResultPage;