import React from "react";

const NavSections = ({ sections }) => {
  return (
    <div className="nav-sections">
      {sections.map((subsection, index) => (
        <div key={index} className="subsection">
          <div className="subsection-header">{subsection.folder}</div>
          {subsection?.sub_section?.map((sub, idx) => (
            <div key={idx} className="sub-section">
              <a href={sub.pathUrl}>{sub.name}</a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NavSections;
