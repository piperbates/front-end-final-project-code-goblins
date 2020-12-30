import React from 'react';
import { Select, Radio } from 'antd';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function Tags (){
    return (
      <>
        
        <Select
          mode="tags"
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          // onChange={handleChange}
          style={{ width: '100%' }}
        >
          {children}
        </Select>
      </>
    );
}


