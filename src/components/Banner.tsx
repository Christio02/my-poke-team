import { MdKeyboardArrowDown } from 'react-icons/md';

export const Banner = () => {
  return (
    <>
      <header className="team-intro-section">
        <aside className="team-banner">
          <h1>Team page</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus culpa dignissimos eaque labore nihil
            officia quo recusandae reiciendis repellat vitae? Assumenda delectus magni natus, omnis quas quasi sequi
            tempore voluptate.
          </p>
        </aside>
        <div className="icon-container">
          <MdKeyboardArrowDown color="white" size={50} />
          {/*
          Will add funcitonality to click arrow, then be moved down to team overview
          */}
        </div>
      </header>
    </>
  );
};
