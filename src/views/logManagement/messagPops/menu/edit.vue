 <template>
  <div>
    <Modal v-model="show" fullscreen title="编辑" width="800" @on-cancel="onCancel">
      <Form :rules="ruleValidate" ref="formValidate" :model="formValidate" label-position="right" :label-width="60">
        <FormItem label="类型：">
          <Select v-model="formValidate.type" style="width:200px">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="departName" label="部门：">
          <Input size="small" readonly style="width:200px" v-model="formValidate.departName" />
          <Button size="small" type="info" @click="openDepartModal">增加</Button>
          <Button size="small" type="info" @click="clearDepardId">清空</Button>
        </FormItem>
        <FormItem prop="notify_abstract" label="摘要：">
          <Input size="small" style="width:400px" type="text" v-model="formValidate.notify_abstract" />
        </FormItem>
        <FormItem label="内容：">
          <div class="edit_container">
            <quill-editor class="editer" v-model="content" :options="editorOption" ref="QuillEditor"> </quill-editor>
          </div>
        </FormItem>
        <Upload
          :show-upload-list="false"
          :on-success="handleUploadSuccess"
          :format="['jpg', 'jpeg', 'png', 'gif']"
          :max-size="2048"
          multiple
          action="api/zuul/system/simple/img/upload"
        >
          <Button icon="ios-cloud-upload-outline"></Button>
        </Upload>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading" style="margin-left:20px" @click="handleConfirm('formValidate')">保存</Button>
      </div>
    </Modal>

    <depart-tree v-if="departModal" :index="index" @change-depart="changeDepart" @close="departModal = false"></depart-tree>
  </div>
</template>

<script>
import { listDepartTree, createNotify, updateNotify } from '@/api/logManagement';
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import departTree from './departTree';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ['link', 'image', 'video'],
  ['clean'] // remove formatting button
];
export default {
  components: {
    quillEditor,
    departTree
  },
  props: ['row', 'typeList'],
  data() {
    return {
      show: true,
      departModal: false,
      loading: false,
      content: '',
      ruleValidate: {
        departName: [{ required: true, message: '请添加部门' }],
        notify_abstract: [{ required: true, message: '请填写摘要', trigger: 'blur' }]
      },
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  // 调用iview图片上传
                  document.querySelector('.ivu-upload .ivu-btn').click();
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          }
        }
      },
      treeData: [],
      typeList: [],
      formValidate: {
        type: 'zxzc',
        departName: '',
        notify_abstract: '',
        notify_departs: []
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.QuillEditor.quill;
    }
  },
  methods: {
    async handleConfirm(name) {
      const { notify_departs, notify_abstract, type } = this.formValidate;
      if (!this.content) {
        return this.$Message.error('请填写内容');
      }
      this.$refs[name].validate(async valid => {
        if (valid) {
          this.loading = true;
          try {
            await updateNotify({
              id: this.row.id,
              notify_type: type,
              notify_abstract,
              notify_departs: [...new Set(notify_departs)].join(','),
              notify_content: this.content
            });

            this.$emit('ok');
            this.$emit('cancel');
          } catch (error) {
            console.log(error);
          } finally {
            this.loading = false;
          }
        }
      });
    },
    changeDepart(value) {
      let { departName = '', notify_departs } = this.formValidate;
      this.formValidate.notify_departs = notify_departs.concat(value.departId);
      this.formValidate.departName = [...new Set(departName.split(',').concat(value.departName))].join(',').replace(/^,/, '');
    },
    clearDepardId() {
      this.formValidate.notify_departs = [];
      this.formValidate.departName = '';
    },
    onCancel() {
      this.$emit('cancel');
    },
    openDepartModal() {
      this.departModal = !this.departModal;
    },
    handleUploadSuccess(res) {
      // 获取富文本组件实例
      console.log(res);
      let path = JSON.parse(res.data).realpath;
      let quill = this.$refs.QuillEditor.quill;
      // 如果上传成功
      if (res) {
        res = `/api/assets/${path}`;
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', res);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        // 提示信息，需引入Message
        this.$Message.error('图片插入失败');
      }
    }
  },
  async created() {
    let { row } = this;
    this.formValidate.type = row.notify_type;
    this.formValidate.notify_abstract = row.notify_abstract;
    this.formValidate.departName = row.notify_depart_name;
    this.formValidate.notify_departs = row.notify_departs.split(',');
    this.content = row.notify_content;
  }
};
</script>


<style lang="less">
.edit_container {
  margin-bottom: 40px;
}
.editer {
  height: 280px;
}
.submit_btn {
  text-align: center;
}
.ivu-upload {
  display: none;
}
</style>