<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <div style="font-size: 25px;">当前修改{{this.filename}}.html</div>
          <Form ref="tdksave" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item  prop="tdk">
              <Input type="textarea" :rows="30" v-model="form" placeholder="tdk"></Input>
            </Form-item>
          </Form>


        </div>
        <div slot="footer">
          <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
        </div>
      </Modal>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';

  export default {
    data() {
      return {
        modal: false,
        modal_loading: false,
        AddRule: {}
      }
    },
    methods: {
      add() {
        this.$refs.tdksave.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = {
              content: this.form,
              filename: this.filename
            }
            this.apiPost('user/questiontdkedit', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.tdksave.resetFields();
              }, (data, msg) => {
                this.modal_loading = false;
                this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              this.modal_loading = false;
              this.$Message.error('网络异常，请稍后重试。');
            })
          }
        })
      }
    },
    props: {
      form: {
        default:''
      },
      filename: {
        default: ''
      }
    },
    mixins: [http]
  }
</script>
