const Render = function(target: any, propertyName: string): void {
  target.$safe_fields = target.$safe_fields || [];
  target.$safe_fields.push(propertyName);
}

export { Render, Render as default };
