<template>
    <div>
        <Tabs value="name1">
            <TabPane label="未开始" name="unbegin">
                <notbegin :department="department"></notbegin>
            </TabPane>
            <TabPane label="服务中" name="service">
                <serving :department="department"></serving>
            </TabPane> 
            <TabPane label="已完结" name="finish">
                <finished :department="department"></finished>
            </TabPane>
            <TabPane label="全部" name="all">
                <all :department="department"></all>
            </TabPane>
        </Tabs>
        <detail></detail>
        <company-detail></company-detail>
        <flow></flow>
    </div>
</template>

<script>
import Detail from './myCommonTaskIndex/detail'
import CompanyDetail from './myCommonTaskIndex/companydetail'
import Flow from './myCommonTaskIndex/flow'
import Serving from './myCommonTaskIndex/serving'
import All from './myCommonTaskIndex/all'
import Finished from './myCommonTaskIndex/finished'
import Notbegin from './myCommonTaskIndex/notbegin'

    export default {
        components:{
            Serving,
            All,
            Finished,
            Notbegin,
            Detail,
            CompanyDetail,
            Flow
        },
        data(){
            return{
                hash:new Map(),
                department:'Bussiness'
            }
        },
        // methods:{
        //     getDataCenter(){
        //         let _self = this
        //         let url2 = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=payDir`
            
        //         _self.$http.get(url2).then(function(res){
        //             console.log(res.data.data.payDir.length)
        //             let len = res.data.data.payDir.length
        //             let temp = res.data.data.payDir
        //             let payDir_Map = new Map()
        //             for(let i = 0; i<len;i++){
        //                 _self.hash.set(temp[i].typecode,temp[i].typename)
        //             }
        //             // console.log(payDir_Map)
        //             // console.log(payDir_Map.get('zht'))
        //             // _self.hash = payDir_Map
        //             console.log(_self.hash)
        //         })
        //     }
        // },
        // created(){
        //     this.getDataCenter()
        // }

    }
</script>