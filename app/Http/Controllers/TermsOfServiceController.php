<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class TermsOfServiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('TermsOfService/Index');
    }
}
