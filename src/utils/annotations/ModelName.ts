const ModelName = function(name: string) {
  return (target: any) => {
    Reflect.defineMetadata('sequelize:modelName', name, target.prototype)
  }
}

export { ModelName, ModelName as default };
