<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class LoginAPITest extends TestCase
{
    use RefreshDatabase;

    public function test_can_login_with_valid_credentials(): void
    {
        User::factory()->create(['username' => "abanda"]);

        $data = [
            'username' => "abanda"
        ];


        $response = $this->postJson("/api/login", $data);

        $response->assertOk();

        $data = $response->getData();

        $this->assertNotNull($data->api_token);
        $this->assertNotNull($data->user);
    }

    public function test_can_reject_invalid_credentials()
    {
        User::factory()->create(['username' => "abanda"]);

        $data = [
            'username' => "abanda2",
            'password' => "password"
        ];


        $response = $this->postJson("/api/login", $data);
        $response->assertUnprocessable();
    }


    public function test_user_can_logout()
    {

        $user = User::factory()->create(['username' => "abanda"]);
        $data = [
            'username' => "abanda",
            'password' => "password"
        ];

        $response = $this->postJson("/api/login", $data);
        $response->assertOk();

        //

        $response = $this->withHeaders([
            "Authorization" => "Bearer {$response->decodeResponseJson()['api_token']}"
        ])->postJson("/api/logout");

        $response->assertOk();

        $user->refresh();
        $this->assertEquals(0, $user->tokens()->count());
    }

    public function test_can_change_password()
    {

        $user = User::factory()->create(['username' => "abanda"]);

        $data = [
            'password' => "12344321",
            'password_confirmation' => "123444321",
        ];

        Sanctum::actingAs($user);
        $response = $this->patchJson("api/users/{$user->id}/change-password", $data);

        $response->assertOk();


        // try to login
        $data = [
            'username' => "abanda",
            'password' => "12344321"
        ];

        $response = $this->postJson("/api/login", $data);
        $response->assertOk();
    }

}
