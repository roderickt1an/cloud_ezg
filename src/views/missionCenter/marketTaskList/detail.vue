<template>
    <Modal
            title="查看详情"
            v-model="openAddMission"
            width="450"
            :mask-closable="false"
    >
        <div style="min-height:60vh;width:400px" v-if="data.length!==0">
            <Row :gutter="20" style="margin-top:20px">
                <Col span="6">
                    <span style="line-height:24px">任务名称</span>
                </Col>
                <Col span="18">
                    <Input v-model="data.taskName" size="small" style="width:180px" type="textarea" :row="5" autosize>
                    </Input>
                </Col>
            </Row>
            <Row :gutter="20" style="margin-top:20px">
                <Col span="6">
                    <span style="line-height:24px">公司名称</span>
                </Col>
                <Col span="18">
                        <span style="line-height:24px">{{data.companyName}}
                            </span>
                </Col>
            </Row>
            <Row :gutter="20" style="margin-top:20px">
                <Col span="6">
                    <span style="line-height:24px">客户</span>
                </Col>
                <Col span="18">
                    <span style="line-height:24px">{{data.customerName}}<span style="margin-left: 10px"><Button v-if="data.customerName!==null" type="primary" size="small" @click="customer_detail">客户详情</Button></span></span>
                </Col>
            </Row>
            <Row :gutter="20" style="margin-top:20px">
                <Col span="6">
                    <span style="line-height:24px">任务类型</span>
                </Col>
                <Col span="18">
                    <span style="line-height:24px">{{data.taskKindName}}</span>
                </Col>
            </Row>
            <Row :gutter="20" style="margin-top:20px">
                <Col span="6">
                    <span style="line-height:24px">跟进阶段</span>
                </Col>
                <Col span="18">
                    <Select v-model="data.follow_result" size="small" style="width:180px" @on-change="getFollowResult">
                        <Option v-for="item in followResult" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                    </Select>
                </Col>
            </Row>
            <Row :gutter="20" style="margin-top:20px">
                <Col span="6">
                    <span style="line-height:24px">代办于</span>
                </Col>
                <Col span="18">
                    <Input v-model="data.planDate" size="small" style="width:180px" readonly>
                    </Input>
                </Col>
            </Row>
            <Row :gutter="20" style="margin-top:20px">
                <Col span="6">
                    <span style="line-height:24px">任务结果</span>
                </Col>
                <Col span="18">
                    <Select v-model="mission" size="small" style="width:180px" @on-change="getFollowResult">
                        <Option v-for="item in missionList" :value="item.typecode" :key="item.typecode">{{item.typename}}</Option>
                    </Select>
                </Col>
            </Row>
            <Row :gutter="20" style="margin-top:20px">
                <Col span="6">
                    <span style="line-height:24px">任务总结</span>
                </Col>
                <Col span="18">
                    <Input v-model="taskSummary" size="small" style="width:180px" type="textarea" :row="5" autosize>
                    </Input>
                </Col>
            </Row>
            <Row style="margin-top:40px">
                <Button @click="update_detail" v-if="data.taskStage!=='tesCanceled'"  type="primary" style="margin-left:40px" :disabled="openSubmit" :loading="loading">提交</Button>
                <Button @click="delete_task" v-if="data.taskStage!=='tesCanceled'"  type="error" style="margin-left:50px">作废</Button>
            </Row>
        </div>
        <div slot="footer">
            <Button @click="cancel_detail" v-if="data.taskStage=='tesCanceled'"  type="primary" style="margin-left:40px" :loading="loading">关闭</Button>
        </div>
    </Modal>
</template>

<script>
    import {FULLDateFormat} from "../../../libs/utils";

    export default {
        name: "detail",
        data(){
            return{
                openAddMission:false,
                data:[],
                fieldDetail:[],
                beginImgList:[],
                endImgList:[],
                followResult:[],
                oldTaskName: "",
                mission:"Completed",
                missionList:[{"typecode":"Completed","typename":"完成"},{"typecode":"Failed","typename":"失败"}],
                // oldTaskContent: "",
                newPlanTime: "",
                oldPlanTime: "",
                newBusinessArea:"",
                oldBusinessArea:"",
                newBusinessPlace:"",
                oldBusinessPlace:"",
                newWorkFlowStatus:"",
                oldWorkFlowStatus:"",
                newCompanyId:"",
                oldCompanyId:"",
                newBusinessId:"",
                oldBusinessId:"",
                newLegType:"",
                oldLegType:"",
                newLegName:"",
                oldLegName:"",
                nowName:"",
                newFollowResult:"",
                oldFollowResult:"",
                taskSummary:"",
            }
        },
        methods:{
            get_data_center(){
                let params = "followStage"

                let _self = this

                function success(res){
                    _self.followResult = res.data.data.followStage
                    // _self.taskLevel = res.data.data.taskLevel
                    // _self.taskDesCode = res.data.data.taskDesCode
                    // _self.taskKind = res.data.data.taskKind
                    // _self.taskStage = res.data.data.taskStage
                    // _self.market_status = res.data.data.market_status
                    // _self.markert_follow_up_type = res.data.data.markert_follow_up_type
                    // _self.taskLevel_map = _self.$array2map(_self.taskLevel)
                    // _self.taskDesCode_map = _self.$array2map(_self.taskDesCode)
                    // _self.taskKind_map = _self.$array2map(_self.taskKind)
                    // _self.taskStage_map = _self.$array2map(_self.taskStage)
                    // _self.market_status_map = _self.$array2map(_self.market_status)
                    // _self.markert_follow_up_type_map = _self.$array2map(_self.markert_follow_up_type)
                }
                this.$GetDataCenter(params, success)
            },
            cancel_task(){
                this.openAddMission = false
            },
            getPlanTime(e){
                console.log(e)
                let _self = this
                _self.newPlanTime = e
            },
            getFollowResult(e){
                console.log(e)
                let _self = this
                _self.newFollowResult = e
            },
            cancel_detail(){
                this.openAddMission = false
            },
            delete_task(){
                let _self = this

                let url = `api/task/deleteTask`
                let config = {
                    params: {
                        taskId: _self.data.taskId
                    }
                }
                function success(res){
                    // _self.$Message.success(res.data.msg)
                    setTimeout(()=>{
                        _self.$bus.emit("UPDATE_EXECUTING_DATA",true)
                        _self.$bus.emit("UPDATE_DATA",true)
                        _self.openAddMission = false

                    }, 500)
                }
                function fail(err){

                }
                _self.$Get(url, config, success, fail)
            },
            update_detail(){
                let _self = this
                let url = `api/task/updateMarketLegworkTask`
                let config = {
                    taskId: _self.data.taskId,
                    taskName: _self.data.taskName,
                    sPlanDate:FULLDateFormat(_self.data.planDate),
                    executorId:_self.data.executorId,
                    executorName:_self.data.executorName,
                    companyId:_self.data.companyId,
                    customerId:_self.data.customer_id,
                    followResult:_self.data.follow_result,
                    taskSummary:_self.taskSummary,
                    mission: _self.mission
                }
                function success(res){
                    _self.$bus.emit("UPDATE_EXECUTING_DATA",true)
                    _self.$bus.emit("UPDATE_FINISHED_DATA",true)
                    _self.openAddMission = false
                    _self.taskSummary = ""
                }
                function fail(){

                }
                this.$Post(url,config,success,fail)
                // let url = `api/task/updateLegworkTask`
                // let config = {
                //     taskId: _self.id,
                //     taskName: _self.data[0].taskName,
                //     sPlanDate:FULLDateFormat(_self.data[0].planDate),
                //     executorId:_self.data[0].executorId,
                //     executorName:_self.data[0].executorName,
                //     companyId:_self.data[0].companyId,
                //     workFlowStatus:_self.data[0].workFlowStatus,
                //     taskArea:_self.data[0].taskArea,
                //     taskPlace:_self.data[0].taskPlace,
                //     businessId:_self.data[0].businessId,
                // }
                // function success(res){
                //     _self.$bus.emit("UPDATE_TASK_LIST",true)
                //     _self.get_detail(_self.id)
                //     _self.openTaskDetail = false
                // }
                // function fail(){
                //
                // }
                // this.$Post(url,config,success,fail)
            },
            customer_detail(){
                this.$store.commit('open_gobal_customer_detail_modal', {ID: this.data.customer_id});
            }
        },
        created() {
            this.$bus.off("SHOW_MARKET_DETAILS",true)
            this.$bus.on("SHOW_MARKET_DETAILS",(e)=>{
                this.openAddMission = true
                this.get_data_center()
                this.data = e.row
            })
            this.$bus.off("SHOW_OBSOLETE_DETAILS",true)
            this.$bus.on("SHOW_OBSOLETE_DETAILS",(e)=>{
                this.openAddMission = true
                this.get_data_center()
                this.data = e.row
                this.oldTaskName = e.row.taskName
                this.oldPlanTime = e.row.planDate
                this.oldFollowResult = e.row.follow_result
            })
        }
    }
</script>

<style>

</style>