const SUPABASE_URL = 'https://tummmtcgxaxhmdnclsxd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Hy43AwFo5rkRMwxABp8MQw_SBl9S2rr'; //Chave de API que foi trocada na conversa com o Claude
const TABLE_NAME = 'confirmacoes';

const form = document.getElementById('form-rsvp');
const statusElement = document.getElementById('rsvp-status');
const submitButton = form ? form.querySelector('[type="submit"]') : null;

const setStatus = (message, type) => {
    if (!statusElement) {
        return;
    }

    statusElement.textContent = message;
    statusElement.classList.remove('success', 'error');
    if (type) {
        statusElement.classList.add(type);
    }
};

const createPayload = (formData, includePresence = true) => {
    const payload = {
        nome: String(formData.get('nome') || '').trim(),
        acompanhantes: Number(formData.get('acompanhantes') || 0),
        quantidade_criancas: Number(formData.get('quantidade_criancas') || 0),
        mensagem: String(formData.get('mensagem') || '').trim(),
        criado_em: new Date().toISOString()
    };

    if (includePresence) {
        payload.presenca = String(formData.get('presenca') || '').trim();
    }

    return payload;
};

const sendConfirmation = async (payload) => {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
        method: 'POST',
        headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal'
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        return;
    }

    const errorText = await response.text();
    throw new Error(errorText || 'Falha ao enviar confirmação.');
};

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const payload = createPayload(formData, true);

        if (!payload.nome || !payload.presenca) {
            setStatus('Preencha nome e presença para continuar.', 'error');
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
        }
        setStatus('Enviando confirmação...', '');

        try {
            try {
                await sendConfirmation(payload);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                if (!errorMessage.includes("Could not find the 'presenca' column")) {
                    throw error;
                }

                await sendConfirmation(createPayload(formData, false));
                console.warn('A coluna presenca nao existe em confirmacoes. A confirmacao foi salva sem esse campo.');
            }

            form.reset();
            setStatus('Presença confirmada! 🎉', 'success');
        } catch (error) {
            setStatus('Não foi possível enviar agora. Tente novamente em instantes.', 'error');
            console.error('Erro RSVP:', error);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
}
