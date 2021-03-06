const path = require('path');
const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

app.use(express.static(path.join(__dirname, 'release')));

app.use('/app1', proxy({
    target: 'http://localhost:9001',
    changeOrigin: true,
    pathRewrite: {
        '^/app1': '/',
    }}));

app.use('/app2', proxy({
    target: 'http://localhost:9002',
    changeOrigin: true,
    pathRewrite: {
        '^/app2': '/',
    }}));

app.use('/app3', proxy({
    target: 'http://localhost:9003',
    changeOrigin: true,
    pathRewrite: {
        '^/app3': '/',
    }}));

app.use('/app4', proxy({
    target: 'http://localhost:9004',
    changeOrigin: true,
    pathRewrite: {
        '^/app4': '/',
    }}));

app.use('/app5', proxy({
    target: 'http://localhost:9005',
    changeOrigin: true,
    pathRewrite: {
        '^/app5': '/',
    }}));


app.listen(9000);