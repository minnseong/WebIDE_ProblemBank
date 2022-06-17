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


function TestPage(props) {

    const lowLevel =[1,2,3,4,5,6,7,8,9,10,11,12,13]
    const middleLevel = [14,15,16,17,18,19,20,21,22,23,24,25,26,27]
    const highLevel = [28,29,30,31,32,33,34,35,36,37,38,39,40]

    const randomNum = function(length){
        return (Math.abs(parseInt(Math.random() * length)-5))
    }


    return (
        <div style={{textAlign :'center', overflow:'hidden'}}>
            
            <Card style={{ width: '20rem' ,float: 'left', marginTop : '5%' ,marginLeft: '10%'}}>
            <Card.Img variant="top" src={Images.lowlevelimg}  />
            <Card.Body>
                <Card.Title><b>하</b></Card.Title>
                <Card.Text>
                프로그래밍 입문자들을 위한 쉬운 수준입니다. 최소한의 컴퓨터적 사고와 프로그래밍 문법을 이해하고 있어야 합니다.
                </Card.Text>
               <Button  onClick={() => props.history.push(`/coding-test/level1?id=${lowLevel[randomNum(lowLevel.length)]}`)}  variant="primary">문제 풀러 가기</Button>
            </Card.Body>
            </Card>
            <Card style={{ width: '20rem', float:'right', marginTop : '5%', marginRight: '14%'}}>
            <Card.Img variant="top" src={Images.highlevelimg} />
            <Card.Body>
                <Card.Title><b>상</b></Card.Title>
                <Card.Text>
                코딩 테스트에 주로 출제되는 유형으로 문제가 구성되어 있으며, 기업 코딩 테스트를 진행하기에 무리가 없으시면 푸는 것을 추천합니다.
                </Card.Text>
                <Button onClick={() => props.history.push(`/coding-test/level3?id=${highLevel[randomNum(highLevel.length)]}`)}  variant="primary">문제 풀러 가기</Button>
            </Card.Body>
            </Card>
            <Card style={{ width: '20rem' ,float: 'right',   marginTop : '5%' ,marginRight: '10%'}}>
            <Card.Img variant="top" src={Images.middlelevelimg}/>
            <Card.Body>
                <Card.Title><b>중</b></Card.Title>
                <Card.Text>
                문제 해결을 위한 논리적 사고가 필요하며, 알고리즘과 자료구조의 이해가 요구되는 문제로 구성되어 있습니다.
                </Card.Text>
                <Button  onClick={() => props.history.push(`/coding-test/level2?id=${middleLevel[randomNum(middleLevel.length)]}`)} variant="primary">문제 풀러 가기</Button>
            </Card.Body>
            </Card>
        </div>
        )
    }

export default TestPage;