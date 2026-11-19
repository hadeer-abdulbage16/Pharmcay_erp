<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: [
            __DIR__ . '/../routes/web.php',
            __DIR__ . '/../routes/crm.php',        
            __DIR__.'/../routes/system_setup.php',
            __DIR__.'/../routes/user_roles.php',
            __DIR__.'/../routes/settings.php',
            __DIR__.'/../routes/auth.php',
            __DIR__.'/../routes/inventory.php',
            __DIR__.'/../routes/invoice.php',
            __DIR__.'/../routes/accounting.php',
            __DIR__.'/../routes/company.php',
            __DIR__.'/../routes/purchase.php',
        ],

        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
