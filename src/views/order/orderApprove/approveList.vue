<template>
    <div>
        <Card >
            <Row style="margin-bottom:10px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                            筛选
                        <div slot="content" @keydown.enter="search">
                            <Form ref="formValidateSearch" :model="formValidateSearch" :label-width="80" style="margin-top: -10px">
                                <Row>
                                    <Col span="6">
                                        <FormItem label="订单号码：" prop="ordercode">
                                            <Input v-model="formValidateSearch.ordercode" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="公司名称：" prop="companyname">
                                            <Input v-model="formValidateSearch.companyname" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="客户名称：" prop="customername">
                                            <Input v-model="formValidateSearch.customername" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="客户电话：" prop="customertel">
                                            <Input v-model="formValidateSearch.customertel" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="6">
                                        <FormItem label="创建人：" prop="crealname">
                                            <Input v-model="formValidateSearch.crealname" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem>
                                            <Button size="small" type="primary" @click="search">搜索</Button>
                                            <Button size="small" type="ghost" @click="handleReset('formValidateSearch')" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Panel>
                </Collapse>
            </Row>
            <Row>
            <ButtonGroup>
                <Button v-permission="['orderA.exportN']" type="primary" icon="ios-color-filter-outline" @click="download_excel">导出Excel</Button>
                <Button type="primary" icon="ios-color-filter-outline" @click="get_table_data">刷新</Button>                            
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table 
                highlight-row 
                border 
                :columns="header" 
                :data="data" 
                size="small" 
                @on-row-click="select_row" 
                :loading="tableLoading"></Table>
            <Page
                size="small"
                :total="total"
                show-total
                show-sizer
                :current.sync="page"
                transfer
                show-elevator
                @on-change="page_change"
                @on-page-size-change="page_size_change"
                style="margin-top: 10px"></Page>
        </Row>
    </Card>
    </div>
</template>

<script>
export default {
    name: "FinishApproveList",
    props: {},
    data(){
        return{
            search_model: 1,
            tableLoading: false,
            total: 0,
            header: [
                    {
                        title: '订单号码',
                        key: 'ordercode',
                        minWidth: 160
                    },
                    {
                        title: '归属公司',
                        key: 'companyname',
                        minWidth: 300
                    },
                    {
                        title: '客户名称',
                        key: 'name',
                        minWidth: 120
                    },
                    {
                        title: '客户电话',
                        key: 'tel',
                        minWidth: 120
                    },
                    {
                        title: '创建人',
                        key: 'crealname',
                        minWidth: 100
                    },
                    {
                        title: '跟进人',
                        key: 'frealname',
                        minWidth: 100
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        minWidth: 100
                    },
                    {
                        title: '缴费时间',
                        key: 'payTime',
                        minWidth: 100
                    },
                    {
                        title: '缴费渠道',
                        key: 'paydirName',
                        minWidth: 100
                    },
                    {
                        title: '订单价格',
                        key: 'paynumber',
                        minWidth: 100
                    },
                    {
                        title: '已付款',
                        key: 'realnumber',
                        minWidth: 100
                    },
                    {
                        title: '余款',
                        key: 'neednumber',
                        minWidth: 100
                    },
                    {
                        title: '当前流程',
                        key: 'ProcessType',
                        minWidth: 100
                    },
                    {
                        title: '更新时间',
                        key: 'updatedate',
                        minWidth: 100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        minWidth: 150,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        // permission: "['orderA.detail']"
                                    },
                                    directives: [
                                        {
                                            name: "permission",
                                            value: "orderA.detail"
                                        }
                                    ],
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click:  () => {
                                            this.order_detail(params)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        // permission: "['orderA.recordN']"
                                    },
                                    directives: [
                                        {
                                            name: "permission",
                                            value: 'orderA.recordN'
                                        }
                                    ],
                                    on: {
                                        click: () => {
                                            this.open_approve_log(params)
                                        }
                                    }
                                }, '审批记录')
                            ]);
                        }
                    }
                ],
            data: [],
            page: 1,
            pageSize: 10,
            //  筛选条件
            formValidateSearch: {
                ordercode: "",
                companyname: "",
                customername: "",
                customertel: "",
                crealname: ""
            },
            //  数据字典
            payDirs: [],
            payDirs_Map: new Map(),
            //  当前选中的行
            selectRow: ""
        }
    },
    methods:{
        //  获取表格数据
        download_excel(){
            let field = [
                {field:'ordercode',title:'订单号码'},
                {field:'companyname',title:'公司名称'},
                {field:'name',title:'客户名称'},
                {field:'crealname',title:'创建人'},
                {field:'frealname',title:'跟进人'},
                {field:'base_createdate',title:'创建时间'},
                {field:'payTime',title:'缴费时间'},                                      
                {field:'base_paydir',title:'缴费渠道',format:'payDirs'},
                {field:'paynumber',title:'订单总价'},
                {field:'realnumber',title:'已付款'},
                {field:'neednumber',title:'余款'},
                {field:'ProcessType',title:'当前流程'},
                {field:'updatedate',title:'更新时间'}                              
            ]
            let _self = this
            let url = `api/order/auditList`
            let config = {
                page: '1',
                pageSize: '1000000',
                isAudit:'Y',
                sortField:'id',
                order:'desc',
                ordercode:_self.formValidateSearch.ordercode,
                companyname:_self.formValidateSearch.companyname,
                customername:_self.formValidateSearch.customername,
                customertel:_self.formValidateSearch.customertel,
                crealname:_self.formValidateSearch.crealname,
                export: 'Y',
                exportField: encodeURI(JSON.stringify(field))
            }
            let toExcel = this.$MergeURL(url, config)
            window.open(toExcel)
        },
        get_table_data(){
            let _self = this
            let url = 'api/order/auditList'
            _self.tableLoading = true

            let config = {
                params: {
                    isAudit:'Y',
                    sortField:'id',
                    order:'desc',
                    page:_self.page,
                    pageSize:_self.pageSize,
                    ordercode:_self.formValidateSearch.ordercode,
                    companyname:_self.formValidateSearch.companyname,
                    customername:_self.formValidateSearch.customername,
                    customertel:_self.formValidateSearch.customertel,
                    crealname:_self.formValidateSearch.crealname,
                    // sumField:'paynumber,realnumber,neednumber',
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
                for(let i = 0; i < _self.data.length; i++){
                    if(_self.data[i].base_createdate){
                        _self.data[i].createdate = _self.data[i].base_createdate.slice(0,10)
                    }
                    if(_self.data[i].updatedate){
                        _self.data[i].updatedate = _self.data[i].updatedate.slice(0,10)
                    }
                    _self.data[i].paydirName = _self.payDirs_Map.get(_self.data[i].base_paydir)
                }
                _self.tableLoading = false
            }

            this.$Get(url, config, success)
        },
        search(){
            this.page = 1
            this.get_table_data()
        },
        page_change(e){
            this.page = e
            this.get_table_data()
        },
        page_size_change(e){
            this.pageSize = e
            this.get_table_data()
        },
        handleReset(e){
            this.page = 1
            this.$refs[e].resetFields()
            this.get_table_data()
        },
        select_row(e){
            this.selectRow = e
        },
        //  查看审批记录
        open_approve_log(e){
            this.$bus.emit("ORDER_APPROVELIST_LOG", e.row.id)
        },
        //  查看详情
        order_detail(e){
            this.$bus.emit("OPEN_ORDER_DETAIL", e.row.id)
        },
        get_data_center(){
            let _self = this
            let params = "payDirs"

            function success(res){
                _self.payDirs = res.data.data.payDirs
                _self.payDirs_Map = _self.$array2map(_self.payDirs)
                _self.get_table_data()
            }

            this.$GetDataCenter(params, success)
        },
        
    },
    created() {
        let _self = this
        _self.get_data_center()
        _self.$bus.on("UPDATE_ORDER_DATA", (e)=>{
            _self.get_table_data()
        })
    },
    mounted() {
        
    },
}
</script>

<style>
    .ivu-col-span-6 {
        height: 28px;
    }
</style>