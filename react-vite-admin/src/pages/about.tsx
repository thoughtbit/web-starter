import { useState, useCallback } from 'react';
import { Modal, Button, Drawer, Space } from 'antd';
import NiceModal, { useModal, antdModal } from '@ebay/nice-modal-react';
import UserInfoModal from './UserInfoModal';

export const MyAntdModal = NiceModal.create(({ name }: { name: string }) => {
  const modal = useModal();
  return (
    <Modal title="Hello Antd" visible={modal.visible} onOk={modal.hide} onCancel={modal.hide} afterClose={modal.remove}>
      Greetings: {name}!
    </Modal>
  );
});

const MyAntdDrawer = NiceModal.create(({ name }: { name: string }) => {
  const modal = useModal();
  return (
    <Drawer
      title="Hello Antd"
      visible={modal.visible}
      onClose={modal.hide}
      afterVisibleChange={(visible) => {
        if (!visible) modal.remove();
      }}
    >
      Greetings: {name}!
    </Drawer>
  );
});

const PromiseModal = NiceModal.create(({ name }) => {
  const modal = useModal();
  const handleResolve = () => {
    modal.resolve({ resolved: true });
  };
  const handleReject = () => {
    modal.reject(new Error('Rejected'));
    modal.hide();
  };
  return (
    <Modal title="Promise Example" {...antdModal(modal)}>
      <p>Choose the promise action: {name}</p>
      <Space>
        <Button onClick={handleResolve}>Resolve</Button>
        <Button onClick={handleReject} danger>
          Reject
        </Button>
      </Space>
    </Modal>
  );
});

const ChainingModal = NiceModal.create(({ times }) => {
  const modal = useModal();
  return (
    <Modal title="Chaining Same Modal Example" {...antdModal(modal)}>
      <Button type="primary" onClick={() => modal.resolve()}>
        Hide with resolve.
      </Button>
      <br />
      <br />
      Showed {times}/3 times.
    </Modal>
  );
});

export default function AboutPage() {
  const userModal = useModal(UserInfoModal);
  const chainingModal = useModal(ChainingModal);
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Kennedy',
      job: 'Chief Mobility Orchestrator',
      city: 'North Alec',
    },
    {
      id: '2',
      name: 'Lucius',
      job: 'Internal Research Manager',
      city: 'Littleland',
    },
    {
      id: '3',
      name: 'Carlos',
      job: 'Lead Configuration Analyst',
      city: 'South Lillian',
    },
    {
      id: '4',
      name: 'Urban',
      job: 'Chief Operations Agent',
      city: 'Shieldshaven',
    },
    {
      id: '5',
      name: 'Katrine',
      job: 'Legacy Solutions Orchestrator',
      city: 'South Kyleigh',
    },
  ]);

  const showPromiseModal = () => {
    NiceModal.show(PromiseModal, { name: 'nate' })
      .then((res) => {
        console.log('Resolved: ', res);
        NiceModal.show(PromiseModal, { name: 'nate2' });
      })
      .catch((err) => {
        console.log('Rejected: ', err);
      });
  };
  const showChainingModal = async () => {
    for (let i = 0; i < 3; i++) {
      await chainingModal.show({ times: i + 1 });
      await chainingModal.hide();
    }
  };

  const handleNewUser = useCallback(() => {
    userModal.show().then((newUser: any) => {
      setUsers([newUser, ...users]);
    });
  }, [userModal, users]);

  return (
    <>
      <h2>About</h2>
      <Button type="primary" onClick={handleNewUser}>
        + New User
      </Button>
      <Space>
        <Button type="primary" onClick={() => NiceModal.show(MyAntdModal, { name: 'Nate' })}>
          Show Modal
        </Button>
        <Button type="primary" onClick={() => NiceModal.show(MyAntdDrawer, { name: 'Bood' })}>
          Show Drawer
        </Button>
      </Space>
      <p style={{ color: '#888' }}>NOTE: please open dev console to see the output.</p>
      <Space>
        <Button type="primary" onClick={showPromiseModal}>
          Show Modal
        </Button>

        <Button type="primary" onClick={showChainingModal}>
          Chaining Same Modal
        </Button>
      </Space>
    </>
  );
}
