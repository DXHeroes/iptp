import React from 'react';
import { Link } from '@reach/router';
import { ReactComponent as Icon } from '../assets/icons/touch.svg';
import Button from './Button';

interface Props {
  data: any;
}

const FlowList: React.FC<Props> = ({ data }) => (
  <div className="mb-60">
    <div className="my-10 flex items-center">
      <h2 className="text-30 font-heading">Conditional payments</h2>
      <Link to="/create/flow" className="ml-auto">
        <Button>Create conditional payment</Button>
      </Link>
    </div>
    <ul className="flex overflow-x-scroll">
      <li className="p-20 bg-red text-white rounded-lg w-300 h-200 mr-20 flex-shrink-0">
        <div>
          <div className="uppercase font-bold mb-5">Recommended</div>
          <div>
            Invest online in business opportunities from 1000 CZK and get a
            return! We believe that everyone should be able to invest in
            UNIVERSUM.
          </div>
        </div>
      </li>
      {data.map((flow: any) => (
        <li
          key={flow.id}
          className="p-20 bg-blue text-white rounded-lg w-300 h-200 mr-20 flex-shrink-0"
        >
          <Link to={`/flow/${flow.id}`} className="text-30 font-bold">
            <Icon className="fill-current mb-20 w-30 h-30" />
            {flow.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default FlowList;
