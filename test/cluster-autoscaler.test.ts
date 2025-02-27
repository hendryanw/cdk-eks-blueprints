import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { KubernetesVersion } from 'aws-cdk-lib/aws-eks';
import * as blueprints from '../lib';

test("Cluster autoscaler correctly is using correct defaults if EKS version is not defined in the version map", () => {
    const app = new cdk.App();

    const stack = blueprints.EksBlueprint.builder()
        .account('123456789').region('us-west-2')
        .version(KubernetesVersion.of("1.27"))
        .addOns(new blueprints.ClusterAutoScalerAddOn())
        .build(app, "ca-stack-127");

    const template = Template.fromStack(stack);

    template.hasResource("Custom::AWSCDK-EKS-HelmChart", {
        Properties: {
            Version: "9.29.0",
        },
    });
});


test("Cluster autoscaler correctly is using correct version for 1.26", () => {
    const app = new cdk.App();

    const stack = blueprints.EksBlueprint.builder()
        .account('123456789').region('us-west-2')
        .version(KubernetesVersion.V1_26)
        .addOns(new blueprints.ClusterAutoScalerAddOn())
        .build(app, "ca-stack-126");

    const template = Template.fromStack(stack);

    template.hasResource("Custom::AWSCDK-EKS-HelmChart", {
        Properties: {
            Version: "9.29.0",
        },
    });
});


test("Cluster autoscaler correctly is using correct version for 1.26 specified as string", () => {
    const app = new cdk.App();

    const stack = blueprints.EksBlueprint.builder()
        .account('123456789').region('us-west-2')
        .version(KubernetesVersion.of("1.26"))
        .addOns(new blueprints.ClusterAutoScalerAddOn())
        .build(app, "ca-stack-127");

    const template = Template.fromStack(stack);

    template.hasResource("Custom::AWSCDK-EKS-HelmChart", {
        Properties: {
            Version: "9.29.0",
        },
    });
});