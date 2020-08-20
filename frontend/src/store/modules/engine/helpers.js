export function prepareX(engine) {
  const x = [...Array(76).keys()].map((i) => i * 0.2);
  for (const { startAlt, endAlt } of engine.supercharger) {
    x.push(startAlt, endAlt);
  }
  return x.sort((a, b) => a - b);
}

export function curvePower(curveStart, curveStartPower, x, k) {
  // International Standard atmosphere
  const sigma = ((44.3 - x) / (44.3 - curveStart)) ** 4.256;
  const endPower = curveStartPower * ((sigma - k) / (1 - k));
  return parseFloat(endPower.toPrecision(4));
}

function linePower(stage, x) {
  const a = (stage.endPower - stage.startPower) / (stage.endAlt - stage.startAlt);
  return stage.startPower + a * (x - stage.startAlt);
}

function calculatePower(engine, x) {
  let altitude = 0;
  let power = engine.SLPower;
  if (engine.type === 'piston') {
    if (engine.turbocharger.enabled) {
      return x <= engine.turbocharger.altitude
        ? engine.SLPower
        : curvePower(engine.turbocharger.altitude, power, x, engine.k);
    }
    for (const stage of engine.supercharger) {
      if (x <= stage.startAlt) {
        return curvePower(altitude, power, x, engine.k);
      }
      if (x <= stage.endAlt) {
        return linePower(stage, x);
      }
      altitude = stage.endAlt;
      power = stage.endPower;
    }
    return curvePower(altitude, power, x, engine.k);
  }
  return power * (1 - x / 44.3) ** 2.5536;
}

export function roundPower(engine, x) {
  return parseFloat(calculatePower(engine, x).toPrecision(4));
}
