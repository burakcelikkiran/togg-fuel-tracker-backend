<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class LandingController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        if (Auth::guard('customer')->check()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Landing');
    }
}
