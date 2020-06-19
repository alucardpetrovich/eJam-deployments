import { NotFound } from "@shared/errors";
import { Deployment } from "@modules/deployments/deployments.model";
import { CreateDeploymentType } from "@modules/deployments/schemas/create-deployment.schema";

export class DeploymentsService {
  async getAll(): Promise<Deployment[]> {
    return Deployment.find();
  }

  async create(
    createDeploymentParams: CreateDeploymentType
  ): Promise<Deployment> {
    return Deployment.create(createDeploymentParams);
  }

  async deleteOne(id: string): Promise<Deployment> {
    const deletedDeployment = await Deployment.findByIdAndDelete(id);

    if (!deletedDeployment) {
      throw new NotFound(`Deployment with 'id' ${id} was not found`);
    }

    return deletedDeployment;
  }
}

export const deploymentsService = new DeploymentsService();
