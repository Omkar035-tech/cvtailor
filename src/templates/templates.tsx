
import React, { FC } from "react";

// Define types for DynamicVariables
interface DynamicVariables {
  [key: string]: any; // Allows for flexible structures like arrays and objects
}

interface TemplateProps {
  name: string; // The template name to render
  data: DynamicVariables; // Data to replace placeholders
}

const templates = [
  {
    templates_name: "resume_templates_01",
    HTML: `<style>
    

 body {
   min-height: 100%;
   font-weight: 400;
   color: #222;
   font-size: 14px;
   line-height: 26px;
   padding-bottom: 50px;
 }

 .container {
   max-width: 700px;
   background: #fff;
   margin: 0px auto 0px;
   box-shadow: 1px 1px 2px #DAD7D7;
   border-radius: 3px;
   padding: 40px;
   margin-top: 50px;
 }

 .header {
   margin-bottom: 30px;
 }
 .header .full-name {
   font-size: 40px;
   text-transform: uppercase;
   margin-bottom: 5px;
 }
 .header .first-name {
   font-weight: 700;
 }
 .header .last-name {
   font-weight: 300;
 }
 .header .contact-info {
   margin-bottom: 20px;
 }
 .header .email,
 .header .phone {
   color: #999;
   font-weight: 300;
 }
 .header .separator {
   height: 10px;
   display: inline-block;
   border-left: 2px solid #999;
   margin: 0px 10px;
 }
 .header .position {
   font-weight: bold;
   display: inline-block;
   margin-right: 10px;
   text-decoration: underline;
 }

 .details {
   line-height: 20px;
 }
 .details .section {
   margin-bottom: 40px;
 }
 .details .section:last-of-type {
   margin-bottom: 0px;
 }
 .details .section__title {
   letter-spacing: 2px;
   color: #54AFE4;
   font-weight: bold;
   margin-bottom: 10px;
   text-transform: uppercase;
 }
 .details .section__list-item {
   margin-bottom: 40px;
 }
 .details .section__list-item:last-of-type {
   margin-bottom: 0;
 }
 .details .left,
 .details .right {
   vertical-align: top;
   display: inline-block;
 }
 .details .left {
   width: 60%;
 }
 .details .right {
   tex-align: right;
   width: 39%;
 }
 .details .name {
   font-weight: bold;
 }
 .details a {
   text-decoration: none;
   color: #000;
   font-style: italic;
 }
 .details a:hover {
   text-decoration: underline;
   color: #000;
 }
 .details .skills__item {
   margin-bottom: 10px;
 }
 .details .skills__item .right input {
   display: none;
 }
 .details .skills__item .right label {
   display: inline-block;
   width: 20px;
   height: 20px;
   background: #C3DEF3;
   border-radius: 20px;
   margin-right: 3px;
 }
 .details .skills__item .right input:checked + label {
   background: #79A9CE;
 }
     </style>
    <div class="container">
      <div class="header">
        <div class="full-name">
          <span class="first-name">{name}</span> 
          <span class="last-name">{surname}</span>
        </div>
        <div class="contact-info">
          <span class="email">Email: </span>
          <span class="email-val">{email}</span>
          <span class="separator"></span>
          <span class="phone">Phone: </span>
          <span class="phone-val">{phone}</span>
        </div>
        <div class="about">
          <span class="position">{position}</span>
          <span class="desc">{area_objective}</span>
        </div>
      </div>
      <div class="details">
        <div class="section">
          <div class="section__title">Experience</div>
          <div class="section__list">{map_experience}</div>
        </div>
        <div class="section">
          <div class="section__title">Education</div>
          <div class="section__list">{map_education}</div>
        </div>
        <div class="section">
          <div class="section__title">Skills</div>
          <div class="section__list">{map_skills}</div>
        </div>
      </div>
    </div>`,
    dynamic_var: {
      personal: ["name", "surname", "email", "phone", "position", "area_objective"],
      map_experience: ["job_title", "job_location", "job_period", "job_position", "job_description"],
      map_education: ["edu_institute", "edu_address", "edu_period", "edu_major", "edu_description"],
      map_skills: ["skill_head", "skill_level"],
    },
  },
  {
    "templates_name": "modern_template_01",
    "HTML": `<!-- FONTS -->
    <style>
    .rela-block {
      display: block;
      position: relative;
      margin: auto;
      top: ;
      left: ;
      right: ;
      bottom: ;
    }
    .rela-inline {
      display: inline-block;
      position: relative;
      margin: auto;
      top: ;
      left: ;
      right: ;
      bottom: ;
    }
    .floated {
      display: inline-block;
      position: relative;
      margin: false;
      top: ;
      left: ;
      right: ;
      bottom: ;
      float: left;
    }
    .abs-center {
      display: false;
      position: absolute;
      margin: false;
      top: 50%;
      left: 50%;
      right: false;
      bottom: false;
      transform: translate(-50%, -50%);
      text-align: center;
      width: 88%;
    }
    
    .caps {
      text-transform: uppercase;
    }
    .justified {
      text-align: justify;
    }
    p.light {
      color: #777;
    }
    h2 {
      font-family: 'Open Sans';
      font-size: 30px;
      letter-spacing: 5px;
      font-weight: 600;
      line-height: 40px;
      color: #000;
    }
    h3 {
      font-family: 'Open Sans';
      font-size: 21px;
      letter-spacing: 1px;
      font-weight: 600;
      line-height: 28px;
      color: #000;
    }
    .page {
      width: 90%;
      max-width: 1200px;
      margin: 80px auto;
      background-color: #fff;
      box-shadow: 6px 10px 28px 0px rgba(0,0,0,0.4);
    }
    .top-bar {
      height: 220px;
      background-color: #848484;
      color: #fff;
    }
    .name {
      display: false;
      position: absolute;
      margin: false;
      top: false;
      left: calc(350px + 5%);
      right: 0;
      bottom: 0;
      height: 120px;
      text-align: center;
      font-family: 'Raleway';
      font-size: 58px;
      letter-spacing: 8px;
      font-weight: 100;
      line-height: 60px;
    }
    .name div {
      width: 94%;
    }
    .side-bar {
      display: false;
      position: absolute;
      margin: false;
      top: 60px;
      left: 5%;
      right: false;
      bottom: 0;
      width: 350px;
      background-color: #f7e0c1;
      padding: 320px 30px 50px;
    }
    .mugshot {
      display: false;
      position: absolute;
      margin: false;
      top: 50px;
      left: 70px;
      right: false;
      bottom: false;
      height: 210px;
      width: 210px;
    }
    .mugshot .logo {
      margin: -23px;
    }
    .logo {
      display: false;
      position: absolute;
      margin: false;
      top: 0;
      left: 0;
      right: false;
      bottom: false;
      z-index: 100;
      margin: 0;
      color: #000;
      height: 250px;
      width: 250px;
    }
    .logo .logo-svg {
      height: 100%;
      width: 100%;
      stroke: #000;
      cursor: pointer;
    }
    .logo .logo-text {
      display: false;
      position: absolute;
      margin: false;
      top: 58%;
      left: ;
      right: 16%;
      bottom: ;
      cursor: pointer;
      font-family: "Montserrat";
      font-size: 55px;
      letter-spacing: 0px;
      font-weight: 400;
      line-height: 58.333333333333336px;
    }
    .social {
      padding-left: 60px;
      margin-bottom: 20px;
      cursor: pointer;
    }
    .social:before {
      content: "";
      display: false;
      position: absolute;
      margin: false;
      top: -4px;
      left: 10px;
      right: false;
      bottom: false;
      height: 35px;
      width: 35px;
      background-size: cover !important;
    }
    .social.twitter:before {
      background: url("https://cdn3.iconfinder.com/data/icons/social-media-2026/60/Socialmedia_icons_Twitter-07-128.png") center no-repeat;
    }
    .social.pinterest:before {
      background: url("https://cdn3.iconfinder.com/data/icons/social-media-2026/60/Socialmedia_icons_Pinterest-23-128.png") center no-repeat;
    }
    .social.linked-in:before {
      background: url("https://cdn3.iconfinder.com/data/icons/social-media-2026/60/Socialmedia_icons_LinkedIn-128.png") center no-repeat;
    }
    .side-header {
      font-family: 'Open Sans';
      font-size: 18px;
      letter-spacing: 4px;
      font-weight: 600;
      line-height: 28px;
      margin: 60px auto 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid #888;
    }
    .list-thing {
      padding-left: 25px;
      margin-bottom: 10px;
    }
    .content-container {
      margin-right: 0;
      width: calc(95% - 350px);
      padding: 25px 40px 50px;
    }
    .content-container > * {
      margin: 0 auto 25px;
    }
    .content-container > h3 {
      margin: 0 auto 5px;
    }
    .content-container > p.long-margin {
      margin: 0 auto 50px;
    }
    .title {
      width: 80%;
      text-align: center;
    }
    .separator {
      width: 240px;
      height: 2px;
      background-color: #999;
    }
    .greyed {
      background-color: #ddd;
      width: 100%;
      max-width: 580px;
      text-align: center;
      font-family: 'Open Sans';
      font-size: 18px;
      letter-spacing: 6px;
      font-weight: 600;
      line-height: 28px;
    }
    @media screen and (max-width: 1150px) {
      .name {
        color: #fff;
        font-family: 'Raleway';
        font-size: 38px;
        letter-spacing: 6px;
        font-weight: 100;
        line-height: 48px;
      }
    }
    </style>
    <!-- PAGE STUFF -->
    <div class="rela-block page" style="color:black">
        <div class="rela-block top-bar">
            <div class="caps name"><div class="abs-center">{name} {surname}</div></div>
        </div>
        <div class="side-bar">
            <div class="mugshot">
                <div class="logo">
                    <svg viewbox="0 0 80 80" class="rela-block logo-svg">
                        <path d="M 10 10 L 52 10 L 72 30 L 72 70 L 30 70 L 10 50 Z" stroke-width="2.5" fill="none"/>
                    </svg>
                    <p class="logo-text">{logo_text}</p>
                </div>
            </div>
            <p>{address}</p>
            <p>{landmark}</p>
            <p>{phone}</p>
            <p>{email}</p><br>
            <p class="rela-block social twitter">{twitter_link}</p>
            <p class="rela-block social pinterest">{pinterest_link}</p>
            <p class="rela-block social linked-in">{linkedin_link}</p>
            <p class="rela-block caps side-header">Expertise</p>
            {map_skills}
            <p class="rela-block caps side-header">Education</p>
            <p class="rela-block list-thing">{map_education}</p>
        </div>
        <div class="rela-block content-container">
            <h2 class="rela-block caps title">{position}</h2>
            <div class="rela-block separator"></div>
            <div class="rela-block caps greyed">Profile</div>
            <p class="long-margin">{area_objective}</p>
            <div class="rela-block caps greyed">Experience</div>
            {map_experience}
        </div>
    </div>`,
    dynamic_var: {
      personal: ["name", "surname", "address", "landmark", "email", "phone", "twitter_link", "pinterest_link", "linkedin_link", "position", "area_objective", "logo_text"],
      map_experience: ["job_title", "job_location", "job_period", "job_position", "job_description"],
      map_education: ["edu_institute", "edu_period", "edu_major", "edu_description"],
      map_skills: ["skill_head"]
    },
  }
];

const mapContent = (
  key: string,
  items: Array<{ [key: string]: any }>,
  template_name: string
): string => {
  switch (key) {
    case "map_experience":
      if (template_name === "resume_templates_01") {
        return items
          .map(
            (item) => `
          <div class="section__list-item">
            <div class="left">
              <div class="name">${item.job_title || ""}</div>
              <div class="addr">${item.job_location || ""}</div>
              <div class="duration">${item.job_period || ""}</div>
            </div>
            <div class="right">
              <div class="name">${item.job_position || ""}</div>
              <div class="desc">${item.job_description || ""}</div>
            </div>
          </div>`
          )
          .join("");
      } else if (template_name === "modern_template_01") {

        return items
          .map(
            (item) => `
            <h3>${item.job_title || ""}</h3>
        <p class="light">${item.job_location || ""} ${item.job_position || ""} ${item.job_period || ""}</p>
        <p class="justified">${item.job_description || ""}</p>`
          )
          .join("");
      }
      break;

    case "map_education":
      if (template_name === "resume_templates_01") {
        return items
          .map(
            (item) => `
          <div class="section__list-item">
            <div class="left">
              <div class="name">${item.edu_institute || ""}</div>
              <div class="addr">${item.edu_address || ""}</div>
              <div class="duration">${item.edu_period || ""}</div>
            </div>
            <div class="right">
              <div class="name">${item.edu_major || ""}</div>
              <div class="desc">${item.edu_description || ""}</div>
            </div>
          </div>`
          )
          .join("");
      } else if (template_name === "modern_template_01") {
        return items
          .map(
            (item) => `
            <h3>${item.edu_major || ""}</h3>
        <p class="light">${item.edu_institute || ""} - ${item.edu_period || ""} </p>
        <p class="justified">${item.edu_description || ""}</p>`
          )
          .join("");
      }
      break;

    case "map_skills":
      if (template_name === "resume_templates_01") {
        return items
          .map(
            (item) => `
          <div class="skills__item">
            <div class="left">
              <div class="name">${item.skill_head || ""}</div>
            </div>
            <div class="right">
              ${[1, 2, 3, 4, 5]
                .map((level) => {
                  const checked = item.skill_level >= level ? 'checked' : '';
                  return `<input id="ck${level}" type="checkbox" ${checked}/>
                          <label for="ck${level}"></label>`;
                })
                .join('')}
            </div>
          </div>`
          )
          .join("");
      } else if (template_name === "modern_template_01") {
        return items
          .map(
            (item) => `<p class="rela-block list-thing">${item.skill_head || ""}</p>`
          )
          .join("");
      }
      break;

    default:
      return ""; // Return an empty string if no matching map
  }
  return "";
};

const replacePlaceholders = (
  template: string,
  data: DynamicVariables,
  dynamicVar: { [key: string]: string[] },
  template_name: string
): string => {
  let replacedHTML = template;

  // Replace personal placeholders dynamically
  if (dynamicVar.personal) {
    dynamicVar.personal.forEach((field) => {
      const regex = new RegExp(`{${field}}`, "g");
      replacedHTML = replacedHTML.replace(regex, data[field] || "");
    });
  }
  // Replace array-based placeholders dynamically (like map_experience, map_education, map_skills)
  Object.keys(dynamicVar).forEach((key) => {
    if (key.startsWith("map_") && Array.isArray(data[key])) {
      const placeholderRegex = new RegExp(`{${key}}`, "g");
      const items = mapContent(key, data[key], template_name || []);
      replacedHTML = replacedHTML.replace(placeholderRegex, items);
    }
  });

  return replacedHTML;
};

const Templates: FC<TemplateProps> = ({ name, data }) => {
  const template = templates.find((t) => t.templates_name === name);
  console.log(templates)
  if (!template) return <div>Template not found</div>;

  const { HTML, dynamic_var } = template;
  const renderedHTML = replacePlaceholders(HTML, data, dynamic_var, template?.templates_name);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: renderedHTML }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Templates;






