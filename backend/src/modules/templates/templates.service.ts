import { Template } from "@modules/templates/templates.model";

export class TemplatesService {
  async getAll(): Promise<Template[]> {
    return Template.find();
  }
}

export const templatesService = new TemplatesService();
