# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

import logging
# Get an instance of a logger

logger = logging.getLogger('oritec')


# Clase para agregar atributos a los usuarios.
class Usuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # foto = models.ImageField(upload_to='photos/%Y/%m/%d', null=True, blank=True, verbose_name=u'Foto')

# Las siguientes dos funciones habilitan que luego de crear/guardar usuarios, se creen la amplicion de usuario.
@receiver(post_save, sender=User)
def create_user_usuario(sender, instance, created, **kwargs):
    if created:
        Usuario.objects.create(user=instance)
        # Si es que se habilita restframework
        # Token.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_usuario(sender, instance, **kwargs):
    if hasattr(instance, 'usuario'):
        instance.usuario.save()
    # Si se habilita restframework. Cuando se grabe un usuario se crea su Token.
    # Token.objects.get_or_create(user=instance)
