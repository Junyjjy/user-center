import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {useRef, useState} from 'react';
import {register, searchUsers} from "@/services/ant-design-pro/api";
import {Button, Form, Image, Input, message, Modal, Popconfirm} from "antd";
import {useForm} from "antd/es/form/Form";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};


const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
  },
  {
    title: '用户账户',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    copyable: true,
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} height={100}/>
      </div>
    ),
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '邮件',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '星球编号',
    dataIndex: 'planetCode',
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: { text: '普通用户', status: 'Default' },
      1: {
        text: '管理员',
        status: 'Success',
      },
    },
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
  },

  // {
  //   disable: true,
  //   title: '标签',
  //   dataIndex: 'labels',
  //   search: false,
  //   renderFormItem: (_, { defaultRender }) => {
  //     return defaultRender(_);
  //   },
  //   render: (_, record) => (
  //     <Space>
  //       {record.labels.map(({ name, color }) => (
  //         <Tag color={color} key={name}>
  //           {name}
  //         </Tag>
  //       ))}
  //     </Space>
  //   ),
  // },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

// type newUser = {
//   username: String;
//   userAccount: String;
//   userPassword: String;
// }

export default () => {
  const actionRef = useRef<ActionType>();
  const [tableData, setTableData] = useState([]);

  /*------------------  用户新增弹窗相关  ---------------- */
  // 设置弹窗开关变量
  const [isModalOpen, setIsModalOpen] = useState(Boolean)
  // 新增用户的form
  const [newUserForm] = useForm()
  // 打开弹窗
  const openNewUserModal = () =>{
    setIsModalOpen(true)
  }
  // 保存新用户
  const handleOkNewUser = async () => {
    // const values = await newUserForm.validateFields();
    // 字段校验
    newUserForm.validateFields()
      .then(async (data) => {
          data['checkPassword'] = data['userPassword']
          // 注册新用户
          const id = await register({...data, })
          // 重新获取数据渲染
          await refreshTable()
          setIsModalOpen(false)
          newUserForm.resetFields()
        }
      )
      .catch((error) => {
        console.log('error:', error);
      })

  }
  // 取消提交
  const handleCancelNewUser = async () => {
    const newDatas = await searchUsers()
    setTableData(newDatas)
    setIsModalOpen(false)
    newUserForm.resetFields()
  }

  async function refreshTable(){
    const newDatas = await searchUsers()
    setTableData(newDatas)
  }

  /*------------------  删除用户弹窗相关  ---------------- */
  const [deleteModalOpen,setDeleteModalOpen] = useState(Boolean)
  const [confirmDeleteModel,setConfirmDeleteModel] = useState(Boolean)

    const openDeleteUserModal = () => {
    setDeleteModalOpen(true)
  }
  // const [deleteUserForm] = useForm()

  const handleCancelDeleteUser = () => {
    setDeleteModalOpen(false)
  }


  const [inputValue,setInputValue] = useState()

  const handleOkDeleteUser = () => {
    // setConfirmDeleteModel(true);
    // if (inputValue == null) {
    //   alert("删除账号不能为空");
    //   setConfirmDeleteModel(false);
    // }


    if (inputValue == null) {
      alert("删除账号不能为空");
    } else {
      setConfirmDeleteModel(true);
    }

  }

  const handleOkConfirmDelete = () => {
    setConfirmDeleteModel(false)
  }
  const handleCancelConfirmDelete = () => {
    setConfirmDeleteModel(false)
  }

  const deleteUserInput = (e: any) =>{
    setInputValue(e.target.value);
  }




  return (
    <>
      <div><Button onClick={openNewUserModal}>新增</Button></div>
      {/* 用户新增弹窗 */}
      <Modal title="新增用户" open={isModalOpen} onOk={handleOkNewUser} onCancel={handleCancelNewUser}>
        <Form form={newUserForm}>
          <Form.Item name="username" label="用户名">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="userAccount" label="账号" rules={[{ required: true, message: '账户不能为空' }]}>
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item name="userPassword" label="密码" rules={[{ required: true, message: '密码不能为空' }, {min:8, message:'密码最小要8位'}]}>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="planetCode" label="星球编号" rules={[{ required: true, message: '星球编号不能为空' }, {max:5, message:'不能超过5位'}]}>
            <Input.Password placeholder="请输入星球编号" />
          </Form.Item>
        </Form>
      </Modal>

      {/*-------------------- 用户删除弹窗 ---------------------*/}

      <div><Button onClick={openDeleteUserModal}>删除</Button></div>
      <Modal title="删除用户" open={deleteModalOpen} onCancel={handleCancelDeleteUser} onOk={handleOkDeleteUser}>
        <div><p>所需删除的用户：</p>
          <Input onPressEnter={handleOkDeleteUser}
                 value={inputValue}
                 onChange={deleteUserInput}/></div>
      </Modal>

        <Modal title="是否删除该用户？"
               open={confirmDeleteModel}
               onOk={handleOkConfirmDelete} onCancel={handleCancelConfirmDelete}></Modal>

    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      dataSource={tableData}
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers();
        return {
          data: userList
        }

      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {

        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"

    />
    </>
  );
};
