import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store/root.reducer";
import { getTemplates } from "../store/templates/templates.operations";
import { addDeployment } from "../store/deployments/deployments.operations";
import { ITemplate } from "../shared/interfaces";
import { getSelectedOptionAttr } from "../shared/utils";

type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;
type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

const DeploymentFormStyled = styled.form`
  display: flex;
  margin: 20px auto;
  justify-content: center;
  flex-direction: column;
  width: 220px;
`;

export const DeploymentForm = () => {
  const dispatch = useDispatch();
  const templates = useSelector((state: RootState) => state.templates.data);

  const initialTemplate = {
    _id: "",
    name: "",
    versions: [],
  };
  const [template, setTemplate] = useState<ITemplate>(initialTemplate);
  const templateName = template.name;
  const onTemplateChange = (e: SelectChangeEvent) => {
    const templateId = getSelectedOptionAttr(e, "data-id");
    const selectedTemplate = templates.find(
      (template) => template._id === templateId
    );

    setTemplate(selectedTemplate || initialTemplate);
  };

  const [version, setVersion] = useState<string>("");
  const onVersionChange = (e: SelectChangeEvent) => setVersion(e.target.value);

  const [url, setUrl] = useState<string>("");
  const onUrlChange = (e: InputChangeEvent) => setUrl(e.target.value);

  useEffect(() => {
    dispatch(getTemplates());
  }, [dispatch]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      dispatch(addDeployment({ templateName, version, url }));
    },
    [dispatch, templateName, version, url]
  );

  return (
    <>
      <DeploymentFormStyled onSubmit={onSubmit}>
        <p>Create your new deployment</p>
        <label>Templates</label>
        <select
          name="templates"
          value={templateName}
          onChange={onTemplateChange}
          required
        >
          <option value="" />
          {templates.map((template) => (
            <option
              key={template._id}
              value={template.name}
              data-id={template._id}
            >
              {template.name}
            </option>
          ))}
        </select>

        {templateName && (
          <>
            <label>Version</label>
            <select
              name="versions"
              value={version}
              onChange={onVersionChange}
              required
            >
              <option value="" />
              {template.versions.map((versionName) => (
                <option key={versionName} value={versionName}>
                  {versionName}
                </option>
              ))}
            </select>
          </>
        )}

        <label>Url</label>
        <input
          name="url"
          type="url"
          value={url}
          onChange={onUrlChange}
          required
        />

        <button type="submit">Create</button>
      </DeploymentFormStyled>
    </>
  );
};
