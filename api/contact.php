<?php
// 1. Strict Request Methods
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée."]);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

// 2. Apply Sanitization
$nom = htmlspecialchars(strip_tags(trim($_POST['nom'] ?? $_POST['name'] ?? '')));
$entreprise = htmlspecialchars(strip_tags(trim($_POST['entreprise'] ?? $_POST['company'] ?? '')));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$telephone = htmlspecialchars(strip_tags(trim($_POST['telephone'] ?? $_POST['phone'] ?? '')));
$messageContent = htmlspecialchars(strip_tags(trim($_POST['message'] ?? '')));

// 3. Validation Rules
if (empty($nom) || empty($email) || empty($messageContent)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Veuillez remplir tous les champs obligatoires."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Adresse e-mail invalide."]);
    exit;
}

// 4. Mail Strategy
$to = "contact@soluntek.com";
$subject = "Nouvelle demande de contact - SolunTek Website";

$body = "Vous avez reçu une nouvelle demande de contact.\n\n";
$body .= "Nom: $nom\n";
$body .= "Entreprise: " . ($entreprise ? $entreprise : "Non renseigné") . "\n";
$body .= "Email: $email\n";
$body .= "Téléphone: " . ($telephone ? $telephone : "Non renseigné") . "\n\n";
$body .= "Message:\n$messageContent\n";

$headers = "From: no-reply@soluntek.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 5. Response Dispatch
if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo json_encode([
        "status" => "success", 
        "message" => "Votre message a été envoyé avec succès. Nous vous contacterons sous peu."
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "status" => "error", 
        "message" => "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer plus tard."
    ]);
}
?>
