import React from 'react';
import Bankcard from '../../components/bankcard/';
import Axios from 'axios';
import { getStore } from '../../tools/localStorage';
import serverConfig from '../../config/server';



export default class TotalShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            totalAmount: 0,
            username: ""
        }
    }

    componentWillMount(){
        let userId = getStore("userId");
        Axios.get(serverConfig.server_url+"/api/v0/my_balance?userId="+userId).then(rlt=>{
            console.log(rlt)
            this.setState({
                totalAmount: rlt.data.amount/100,
                username: rlt.data.userId.username,
                loading: false,
            })
            
        }).catch(err=>{
            console.log(err);
            
        })

    }

    render(){
        const {totalAmount, username } = this.state;
        return (
            
            <div>
                <Bankcard  isBankcard={false} 
        cardData={{...this.props.cardData,title: username, carNumber:'￥'+totalAmount}} />
            </div>
        )
    }
}