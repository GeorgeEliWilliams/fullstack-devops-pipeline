<?php

namespace Tests\Feature;

use App\Models\District;
use App\Models\Facility;
use App\Models\Partner;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\AuthTestCase;

class UserAPITest extends AuthTestCase
{
    use RefreshDatabase, WithFaker;

    public function test_can_retrieve_all_users_list()
    {
        $response = $this->getJson('/api/admin/users');

        $response->assertStatus(200);
        $this->assertCount(11, $response->decodeResponseJson()['data']);
    }

    public function test_can_register_user()
    {

        $seed_data = User::factory()->make()->toArray();

        $response = $this->postJson('/api/admin/users', $seed_data);
        $response->assertStatus(Response::HTTP_CREATED);

        $user = User::whereUsername($seed_data['username'])->first();

        $this->assertNotNull($user);
    }


    public function test_can_update_user_details()
    {
        $user = User::factory()->create();
        $seed_data = $user->toArray();

        $updates = [
            'phone' => $this->faker->phoneNumber
        ];
        $seed_data = array_merge($updates, $seed_data);

        $response = $this->patchJson('/api/admin/users/' . $user->id, $seed_data);

    }

    public function test_can_delete_user()
    {
        $user = User::factory()->create();

        $response = $this->deleteJson('/api/admin/users/' . $user->id);
        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }

    /*
    |----------------------------------------
    | Integrity CRUD functionality tests
    |----------------------------------------
    | - Create
    | - Update
    | - Delete
     */

    public function test_can_reject_invalid_user_registration()
    {

        $seed_data = User::factory()->make()->toArray();
        $seed_data['password'] = bcrypt("1234");
        User::create($seed_data);

        // try to register a duplicate user
        $response = $this->postJson('/api/admin/users', $seed_data);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
