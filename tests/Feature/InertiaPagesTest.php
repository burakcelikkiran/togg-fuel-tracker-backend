<?php

namespace Tests\Feature;

use Tests\TestCase;

class InertiaPagesTest extends TestCase
{
    public function test_landing_page_renders_inertia_component(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Landing'));
    }

    public function test_login_page_renders_for_guests(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Auth/Login'));
    }

    public function test_dashboard_requires_authentication(): void
    {
        $response = $this->get('/dashboard');

        $response->assertRedirect('/login');
    }
}
