<?php
// Same-origin proxy for the Tokpie LMN/USDT ticker: Tokpie's public API sends no
// CORS header, so the metrics page cannot read it from the browser directly.
// Returns only the LMN@USDT entry, cached for 60 seconds.

header('Content-Type: application/json');
header('Cache-Control: public, max-age=60');

const TOKPIE_URL = 'https://tokpie.com/api_ticker/';
const PAIR = 'LMN@USDT';
const CACHE_TTL = 60;

$cacheFile = sys_get_temp_dir() . '/lumen_tokpie_lmn_usdt.json';

if (is_file($cacheFile) && time() - filemtime($cacheFile) < CACHE_TTL) {
    readfile($cacheFile);
    exit;
}

function fetch_ticker(): ?string
{
    if (function_exists('curl_init')) {
        $ch = curl_init(TOKPIE_URL);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 8,
            CURLOPT_USERAGENT => 'lumen-browser.com metrics',
        ]);
        $body = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        return ($body !== false && $status === 200) ? $body : null;
    }

    $context = stream_context_create(['http' => [
        'timeout' => 8,
        'header' => "User-Agent: lumen-browser.com metrics\r\n",
    ]]);
    $body = @file_get_contents(TOKPIE_URL, false, $context);
    return $body === false ? null : $body;
}

$body = fetch_ticker();
$tickers = $body === null ? null : json_decode($body, true);
$entry = null;

if (is_array($tickers)) {
    foreach ($tickers as $ticker) {
        if (($ticker['pair'] ?? null) === PAIR) {
            $entry = $ticker;
            break;
        }
    }
}

if ($entry === null) {
    // Serve a stale copy rather than nothing when Tokpie is unreachable.
    if (is_file($cacheFile)) {
        readfile($cacheFile);
        exit;
    }
    http_response_code(502);
    echo json_encode(['error' => 'tokpie_unavailable']);
    exit;
}

$json = json_encode($entry);
@file_put_contents($cacheFile, $json, LOCK_EX);
echo $json;
