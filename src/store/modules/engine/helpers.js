export function curvePower(curveStart, curveStartPower, x, k) {
  // International Standard atmosphere
  const sigma = ((44.3 - x) / (44.3 - curveStart)) ** 4.256;
  return curveStartPower * ((sigma - k) / (1 - k));
}

function curveAltitude(curveStart, curveStartPower, power, k) {
  // International Standard atmosphere
  const sigma = (power / curveStartPower) * (1 - k) + k;
  return (curveStart - 44.3) * sigma ** (1 / 4.256) + 44.3;
}

function linePower(stage, x) {
  const a =
    (stage.endPower - stage.startPower) / (stage.endAlt - stage.startAlt);
  return stage.startPower + a * (x - stage.startAlt);
}

function lineAltitude(stage, power) {
  const a =
    (stage.endPower - stage.startPower) / (stage.endAlt - stage.startAlt);
  return (power - stage.startPower) / a + stage.startAlt;
}

export function prepareX(engine) {
  const x = [...Array(76).keys()].map((i) => i * 0.2);
  for (const { startAlt, endAlt } of engine.supercharger) {
    x.push(startAlt, endAlt);
  }
  for (const stage of engine.supercharger) {
    if (engine.SLPower < stage.startPower) {
      x.pop();
    }
    if (stage.startPower < engine.SLPower && engine.SLPower < stage.endPower) {
      x.push(lineAltitude(stage, engine.SLPower));
    }
    if (engine.SLPower < stage.endPower) {
      x.push(
        curveAltitude(stage.endAlt, stage.endPower, engine.SLPower, engine.k)
      );
    }
  }
  return x.sort((a, b) => a - b);
}

function powerSupercharged(engine, x) {
  let altitude = 0;
  let power = engine.SLPower;
  for (const stage of engine.supercharger) {
    if (stage.startAlt <= x && x <= stage.endAlt) {
      return linePower(stage, x);
    }
    if (stage.endAlt < x) {
      altitude = stage.endAlt;
      power = stage.endPower;
    }
  }
  return curvePower(altitude, power, x, engine.k);
}

/**
 * The return value is calculated from turbo formula if turbo is enabled.
 * Otherwise it's 0 for chart display purposes.
 * @param {object} turbo - Turbo object
 * @param {number} x - Altitude at which power is calculated
 */
export function powerTurbocharged({ turbocharger, SLPower, k }, x) {
  if (turbocharger.enabled) {
    return x <= turbocharger.altitude
      ? SLPower
      : curvePower(turbocharger.altitude, SLPower, x, k);
  }
  return 0;
}

function calculatePower(engine, x) {
  if (engine.type === "Piston") {
    const turbo = powerTurbocharged(engine, x);
    const compressor = powerSupercharged(engine, x);
    return Math.max(turbo, compressor);
  }
  return engine.SLPower * (1 - x / 44.3) ** 2.5536;
}

export function roundPower(engine, x) {
  return parseFloat(calculatePower(engine, x).toPrecision(4));
}
