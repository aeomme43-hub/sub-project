$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()

Write-Host "서버가 http://localhost:8080 에서 실행 중입니다..."
Write-Host "브라우저에서 http://localhost:8080/index.html 를 열어주세요"
Write-Host "서버를 중지하려면 Ctrl+C 를 누르세요"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $url = $request.Url.LocalPath
    $filePath = Join-Path $PSScriptRoot ($url -replace '^/', '')
    
    if ([string]::IsNullOrEmpty($url) -or $url -eq '/') {
        $filePath = Join-Path $PSScriptRoot "index.html"
    }
    
    if (Test-Path $filePath) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
        
        # Content-Type 설정
        $extension = [System.IO.Path]::GetExtension($filePath)
        switch ($extension) {
            '.html' { $response.ContentType = 'text/html; charset=utf-8' }
            '.css' { $response.ContentType = 'text/css; charset=utf-8' }
            '.js' { $response.ContentType = 'application/javascript; charset=utf-8' }
            '.glb' { $response.ContentType = 'model/gltf-binary' }
            '.png' { $response.ContentType = 'image/png' }
            '.jpg' { $response.ContentType = 'image/jpeg' }
            default { $response.ContentType = 'application/octet-stream' }
        }
    } else {
        $response.StatusCode = 404
        $errorContent = [System.Text.Encoding]::UTF8.GetBytes("404 - 파일을 찾을 수 없습니다: $url")
        $response.ContentLength64 = $errorContent.Length
        $response.OutputStream.Write($errorContent, 0, $errorContent.Length)
    }
    
    $response.Close()
}

$listener.Stop()