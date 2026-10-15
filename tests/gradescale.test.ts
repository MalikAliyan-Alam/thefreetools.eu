import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gradeFor, passingScore, scoreFor, minScoreFor, scaleTable } from '../src/tools/gradescale/engine.ts';

test('60 % exigency on 100 points', () => {
  assert.equal(gradeFor(0, 100, 0.6), 1);
  assert.equal(gradeFor(30, 100, 0.6), 2.5);
  assert.equal(gradeFor(60, 100, 0.6), 4);
  assert.equal(gradeFor(80, 100, 0.6), 5.5);
  assert.equal(gradeFor(100, 100, 0.6), 7);
  assert.equal(gradeFor(58, 100, 0.6), 3.9);
  assert.equal(gradeFor(59, 100, 0.6), 4);
  assert.equal(gradeFor(70, 100, 0.6), 4.8);
});

test('other maxima and exigencies', () => {
  assert.equal(passingScore(38, 0.6), 22.8);
  assert.equal(gradeFor(25, 38, 0.6), 4.4);
  assert.equal(gradeFor(30, 60, 0.6), 3.5);
  assert.equal(gradeFor(50, 100, 0.5), 4);
  assert.equal(gradeFor(75, 100, 0.5), 5.5);
  assert.equal(gradeFor(55, 100, 0.55), 4);
});

test('scores outside the range are clamped', () => {
  assert.equal(gradeFor(-5, 50, 0.6), 1);
  assert.equal(gradeFor(70, 50, 0.6), 7);
});

test('score needed for a grade', () => {
  assert.equal(scoreFor(4, 100, 0.6), 60);
  assert.equal(scoreFor(5.5, 100, 0.6), 80);
  assert.equal(scoreFor(7, 40, 0.6), 40);
  assert.equal(minScoreFor(4, 38, 0.6), 23);
  assert.equal(minScoreFor(4, 100, 0.6), 59);
  assert.equal(minScoreFor(5, 100, 0.6), 73);
  assert.equal(minScoreFor(7, 40, 0.6), 40);
});

test('scale table is monotonic and complete', () => {
  const t = scaleTable(60, 0.6);
  assert.equal(t.length, 61);
  assert.equal(t[0].grade, 1);
  assert.equal(t[36].grade, 4);
  assert.equal(t[60].grade, 7);
  for (let i = 1; i < t.length; i++) assert.ok(t[i].grade >= t[i - 1].grade);
});
