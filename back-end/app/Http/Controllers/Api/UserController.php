<?php

namespace App\Http\Controllers\Api;

use App\Helpers\MessageHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\StoreRequest;
use App\Http\Requests\Users\UpdateRequest;
use App\Http\Resources\Users\UserResource;
use App\Models\User;
use App\Notifications\WelcomeNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * @group Users
 *
 * API routes for managing user accounts
 */
class UserController extends Controller
{
    /**
     * Get
     *
     * Returns a list of all user accounts in the system.
     * @authenticated
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $data = User::all();

        return UserResource::collection($data);
    }

    /**
     * Store
     *
     * Registers a new user account
     * @authenticated
     * @param StoreRequest $request
     * @return UserResource
     */
    public function store(StoreRequest $request)
    {
        $data = $request->post();

        $password = Str::random(8);

        $data['password'] = bcrypt($password);

        $user = User::create($data);

        return new UserResource($user);
    }

    /**
     * Show
     *
     * Returns full details for a user
     * @authenticated
     * @param User $user
     * @return UserResource
     */
    public function show(User $user): UserResource
    {
        return new UserResource($user);
    }

    /**
     * Update
     *
     * Updates the user record
     * @authenticated
     * @param UpdateRequest $request
     * @param User $user
     * @return UserResource
     */
    public function update(UpdateRequest $request, User $user)
    {
        $data = $request->post();
        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Delete
     *
     * Removes the user from system
     * @authenticated
     * @param User $user
     * @return JsonResponse
     */
    public function destroy(User $user): JsonResponse
    {
        try {
            $user->delete();

            return response()->json(null, Response::HTTP_NO_CONTENT);
        } catch (\Exception $exception) {
            $message = env('APP_DEBUG') ? $exception->getMessage() : "An unexpected error occurred";

            return response()->json([
                'message' => $message
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
