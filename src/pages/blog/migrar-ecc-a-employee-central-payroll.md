---
layout: ../../layouts/Post.astro
title: "Migrar de SAP HCM a Employee Central Payroll: lo que conviene decidir antes de tocar nada"
description: "El alcance funcional y el análisis de gaps determinan el 80% del resultado de una migración a ECP. Estas son las decisiones que suelen postergarse y acaban costando caras."
date: 2026-09-01
tags: ["ECP", "Migración"]
---

Una migración de SAP HCM on-premise a Employee Central Payroll se vende muchas veces como un cambio de infraestructura: el mismo motor de nómina, alojado en otro sitio. Técnicamente hay algo de verdad en eso, y precisamente por eso se subestima. El motor es el mismo, pero el ecosistema alrededor cambia por completo: de dónde vienen los datos maestros, quién manda sobre qué campo, cómo se lanza el cálculo y quién ve los errores.

Estas son las decisiones que conviene cerrar antes de que empiece la configuración.

## 1. Qué se migra y qué se deja morir

Casi ningún sistema HCM con años de vida merece migrarse entero. Hay conceptos de nómina que nadie usa desde hace cinco años, reglas que se crearon para un convenio que ya no aplica y reportes Z que sustituyó una consulta de negocio.

El análisis de gaps frente al estándar ECP es el momento de hacer esa limpieza. Lo que no se decide aquí se arrastra: cada objeto que se migra por inercia es un objeto que alguien tendrá que mantener y documentar después.

Una regla práctica: si nadie sabe explicar para qué sirve un concepto de nómina, probablemente no haga falta migrarlo. Si nadie sabe explicarlo pero aparece en los resultados del último año, hay que entenderlo antes de tocarlo.

## 2. Quién es el dueño de cada dato

En un SAP HCM clásico, los infotipos se mantienen en el propio sistema. Con Employee Central delante, la mayoría de esa información pasa a replicarse desde EC a través del punto de integración (PTP), y el dueño del dato deja de ser el equipo de nómina.

Esto tiene una consecuencia que aparece siempre, y casi siempre tarde: **hay campos que la nómina necesita y que EC no gestiona de fábrica**. Toca decidir, campo a campo, si se modela en EC (con lo que implica de configuración y de formación de usuarios), si se mantiene manualmente en ECP, o si se calcula.

Cada opción tiene un coste distinto y todos son asumibles. Lo que no es asumible es descubrirlo durante el primer paralelo.

## 3. Cómo se van a tratar los errores de replicación

La integración EC a ECP va a fallar. No es pesimismo, es estadística: cualquier modelo con miles de empleados y replicaciones diarias genera errores de mapeo, de validación o de secuencia.

La pregunta no es cómo evitarlos, sino quién los ve, con qué frecuencia y qué hace con ellos. Un proceso de gestión de errores definido desde el diseño (responsable, periodicidad de revisión, criterio de reproceso) es la diferencia entre una incidencia detectada el día 3 y una detectada el día 28, con el cierre encima.

## 4. Cuántos paralelos y contra qué

Los paralelos de nómina son el único mecanismo fiable para saber si la migración salió bien. Conviene acordar de antemano:

- Cuántos ciclos se van a comparar (tres suele ser el mínimo razonable para capturar variabilidad: una nómina ordinaria, una con paga extra y una con incidencias significativas).
- Qué se considera una discrepancia aceptable. El redondeo, los conceptos informativos y los cálculos con fecha de referencia distinta generan diferencias legítimas que hay que catalogar, no perseguir.
- Quién valida. Si nadie de negocio firma los paralelos, el go-live se hace sobre una validación técnica, que no es lo mismo.

## 5. Qué pasa con los desarrollos ABAP

Los desarrollos custom (funciones de nómina, BADIs, interfaces, reportes Z) sobreviven a la migración, pero no todos con el mismo esfuerzo. Los que leen infotipos replicados hay que revisarlos: el dato sigue ahí, pero puede llegar en otro momento del ciclo o con otro origen.

Merece la pena inventariarlos pronto y clasificarlos en tres cajas: los que se migran tal cual, los que se rehacen contra el estándar de ECP, y los que se retiran porque el estándar ya cubre la necesidad.

## En resumen

La configuración de una migración a ECP no suele ser la parte difícil. Lo difícil es tomar a tiempo cinco o seis decisiones de alcance y de propiedad del dato que, tomadas tarde, se pagan en paralelos que no cuadran y en una estabilización que se alarga meses.

Si estás en ese punto y quieres una lectura externa del alcance antes de arrancar, [escríbeme](/contacto/).
