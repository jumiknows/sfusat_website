import React from 'react';
import { Link } from 'react-router-dom';
import { getProgram } from '../content/recruitment';
import '../pages/Join.css';

interface RecruitingBannerProps {
  program: string;
}

const RecruitingBanner: React.FC<RecruitingBannerProps> = ({ program }) => {
  const details = getProgram(program);

  if (!details?.open) {
    return null;
  }

  return (
    <aside className="recruiting-banner">
      <div className="recruiting-banner-inner">
        <p>{details.name} is recruiting now.</p>
        <Link to="/join" className="btn btn-dark">See open roles</Link>
      </div>
    </aside>
  );
};

export default RecruitingBanner;
